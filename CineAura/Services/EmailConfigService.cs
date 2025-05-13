using CineAura.Data;
using CineAura.Data.DTO;
using CineAura.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Net.Mail;
using System.Net;
using CineAura.Models;
using Mapster;

namespace CineAura.Services
{
    public class EmailConfigService : IEmailConfigService
    {
        private readonly AppDbContext _context;

        public EmailConfigService(AppDbContext context)
        {
            _context = context;
        }

        #region Create
        public async Task<EmailConfigDTO> Create(EmailConfigDTO dto)
        {
            try
            {
                if (await _context.EmailConfig.AnyAsync())
                    throw new Exception("An email configuration already exists. Please update or delete it first.");

                if (!PingSmtpServer(dto))
                    throw new Exception("SMTP test failed. Check your credentials or server details.");

                var config = new EmailConfig
                {
                    SenderEmail = dto.SenderEmail,
                    DisplayName = dto.DisplayName,
                    SmtpHost = dto.SmtpHost,
                    Port = dto.Port,
                    EnableSsl = dto.EnableSsl,
                    EncryptedPassword = AesEncryption.Encrypt(dto.EncryptedPassword)
                };

                _context.EmailConfig.Add(config);
                await _context.SaveChangesAsync();

                return config.Adapt<EmailConfigDTO>();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save the record.");
            }
        }
        #endregion

        #region Delete
        public async Task<bool> Delete(int id)
        {
            try
            {
                var obj = await _context.EmailConfig.FirstOrDefaultAsync(x => x.Id == id);
                _context.EmailConfig.Remove(obj);
                var result = await _context.SaveChangesAsync();

                return result > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred");
            }
        }
        #endregion

        #region Get
        public async Task<EmailConfigDTO?> Get()
        {
            try
            {
                var movies = await _context.EmailConfig.FirstOrDefaultAsync();
                return movies.Adapt<EmailConfigDTO>();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw new Exception("An error occurred while retrieving email config data.");
            }
        }
        #endregion

        #region Test
        public async Task TestSmtpConnection()
        {
            var config = await _context.EmailConfig.FirstOrDefaultAsync();
            if (config == null)
                throw new Exception("No email configuration found in the database.");

            var decryptedPassword = AesEncryption.Decrypt(config.EncryptedPassword);

            using var smtpClient = new SmtpClient(config.SmtpHost, config.Port)
            {
                Credentials = new NetworkCredential(config.SenderEmail, decryptedPassword),
                EnableSsl = config.EnableSsl,
                DeliveryMethod = SmtpDeliveryMethod.Network
            };

            try
            {
                var mail = new MailMessage
                {
                    From = new MailAddress(config.SenderEmail, config.DisplayName),
                    Subject = "SMTP Test",
                    Body = "This is a test email to verify SMTP configuration from the database.",
                    IsBodyHtml = false
                };
                mail.To.Add(config.SenderEmail);

                await smtpClient.SendMailAsync(mail);
            }
            catch (Exception ex)
            {
                throw new Exception($"SMTP test failed: {ex.Message}", ex);
            }
        }        
        #endregion

        #region Update
        public async Task<EmailConfigDTO> Update(int id, EmailConfigDTO dto)
        {
            try
            {
                var obj = await _context.EmailConfig.FirstOrDefaultAsync(x => x.Id == id);
                if (obj == null)
                    return null;

                obj.SenderEmail = dto.SenderEmail;
                obj.DisplayName = dto.DisplayName;
                obj.SmtpHost = dto.SmtpHost;
                obj.Port = dto.Port;
                obj.EnableSsl = dto.EnableSsl;
                obj.EncryptedPassword = AesEncryption.Encrypt(dto.EncryptedPassword);


                await _context.SaveChangesAsync();

                return obj.Adapt<EmailConfigDTO>();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred");
            }
        }
        #endregion

        #region Ping SMTP
        private bool PingSmtpServer(EmailConfigDTO dto)
        {
            try
            {
                using var client = new SmtpClient(dto.SmtpHost, dto.Port)
                {
                    Credentials = new NetworkCredential(dto.SenderEmail, dto.EncryptedPassword),
                    EnableSsl = dto.EnableSsl,
                    DeliveryMethod = SmtpDeliveryMethod.Network
                };

                var testMail = new MailMessage(dto.SenderEmail, dto.SenderEmail, "SMTP Ping Test", "This is a test to validate SMTP settings.");
                client.Send(testMail);

                return true;
            }
            catch
            {
                return false;
            }
        }
        #endregion
    }
}
