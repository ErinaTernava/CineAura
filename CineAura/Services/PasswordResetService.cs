using CineAura.Data;
using CineAura.Data.DTO;
using CineAura.Models;
using CineAura.Services.Interfaces;
using System.Net.Mail;
using System.Net;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using Mapster;

namespace CineAura.Services
{
    public class PasswordResetService : IPasswordResetService
    {
        private readonly AppDbContext _context;
        private readonly IEmailConfigService _emailConfigService;

        public PasswordResetService(AppDbContext context, IEmailConfigService emailConfigService)
        {
            _context = context;
            _emailConfigService = emailConfigService;
        }

        #region Send Code
        public async Task<PasswordResetDTO?> SendCode(string email)
        {
            try
            {
                var user = await _context.User.FirstOrDefaultAsync(u => u.Email == email);
                if (user == null) throw new Exception("User not found");

                var code = GenerateCode();
                var expiresAt = DateTime.UtcNow.AddMinutes(30);

                var resetEntry = new PasswordReset
                {
                    Email = email,
                    Code = code,
                    Expiration = expiresAt,
                    isUsed = false
                };

                _context.PasswordReset.Add(resetEntry);
                await _context.SaveChangesAsync();

                var config = await _emailConfigService.Get();
                var template = await File.ReadAllTextAsync("Resources/emailcode.txt");
                var body = template.Replace("@code", code);

                var decryptedPassword = AesEncryption.Decrypt(config.EncryptedPassword);

                using var smtp = new SmtpClient(config.SmtpHost, config.Port)
                {
                    EnableSsl = config.EnableSsl,
                    Credentials = new NetworkCredential(config.SenderEmail, decryptedPassword)
                };

                var mail = new MailMessage
                {
                    From = new MailAddress(config.SenderEmail, "CineAura"),
                    Subject = "Password Reset Code",
                    Body = body,
                    IsBodyHtml = true
                };

                mail.To.Add(email);
                await smtp.SendMailAsync(mail);

                return resetEntry.Adapt<PasswordResetDTO>();

            }
            catch (Exception ex)
            {
                Console.WriteLine("Error in GenerateSendCode: " + ex.Message);
                return null;
            }
        }
        #endregion

        #region Reset Password
        public async Task<bool> ResetPass(string email, string newpass)
        {
            try
            {
                var user = await _context.User.FirstOrDefaultAsync(u => u.Email == email);
                if (user == null) return false;

                var latestCode = await _context.PasswordReset
                    .Where(p => p.Email == email && !p.isUsed)
                    .OrderByDescending(p => p.Expiration)
                    .FirstOrDefaultAsync();

                if (latestCode == null || latestCode.Expiration < DateTime.UtcNow)
                    return false;

                CreatePasswordHash(newpass, out byte[] hash, out byte[] salt);
                user.PasswordHash = hash;
                user.PasswordSalt = salt;

                latestCode.isUsed = true;

                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error in ResetPass: " + ex.Message);
                return false;
            }
        }
        #endregion

        #region Verify Code
        public async Task<bool> VerifyCode(string email, string code)
        {
            try
            {
                var entry = await _context.PasswordReset
                    .Where(p => p.Email == email && p.Code == code && !p.isUsed)
                    .OrderByDescending(p => p.Expiration)
                    .FirstOrDefaultAsync();

                if (entry == null || entry.Expiration < DateTime.UtcNow)
                    return false;

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error in VerifyCode: " + ex.Message);
                return false;
            }
        }
        #endregion

        #region CreatePasswordHash 
        private void CreatePasswordHash(string password, out byte[] hash, out byte[] salt)
        {
            using var hmac = new HMACSHA512();
            salt = hmac.Key;
            hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }
        #endregion

        #region Generate Code
        private string GenerateCode()
        {
            var random = new Random();
            return random.Next(100000, 999999).ToString();
        }
        #endregion
    }
}
