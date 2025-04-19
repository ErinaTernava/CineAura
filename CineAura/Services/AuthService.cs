using CineAura.Data;
using CineAura.Data.DTO;
using CineAura.Models;
using CineAura.Services.Interfaces;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace CineAura.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;
        public AuthService(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        #region Register
        public async Task<UserDTO> Register(UserRegistrationDTO request)
        {
            try
            {
                CreatePasswordHash(request.Password, out byte[] hash, out byte[] salt);

                User user = new User
                {
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Email = request.Email,
                    PasswordHash = hash,
                    PasswordSalt = salt,
                    IsAdmin = false,
                };

                _context.User.Add(user);
                await _context.SaveChangesAsync();

                return user.Adapt<UserDTO>(); ;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save the user record.");
            }
        }
        #endregion

        #region Login
        public async Task<string> Login(UserLoginDTO request)
        {
            User user = await _context.User.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
            {
                Console.WriteLine($"No user found with email {request.Email}");
                return null;
            }

            if (!VerifyingPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
            {
                Console.WriteLine($"Invalid password for user {request.Email}");
                return null;
            }

            Console.WriteLine($"User {request.Email} logged in successfully");

            return CreateToken(user);
        }
        #endregion

        #region ChangePassword
        public async Task<UserDTO> ChangePassword(int id, ChangePasswordDTO request)
        {
            try
            {
                CreatePasswordHash(request.NewPassword, out byte[] hash, out byte[] salt);

                var user = _context.User.Find(id);
                if (user != null)
                {
                    if (!VerifyingPasswordHash(request.OldPassword, user.PasswordHash, user.PasswordSalt))
                        return null;

                    user.PasswordHash = hash;
                    user.PasswordSalt = salt;

                    await _context.SaveChangesAsync();
                }
                return user.Adapt<UserDTO>();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while attempting to save the user record."); ;
            }
        }
        #endregion

        #region CreateToken
        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {

                new Claim(ClaimTypes.Role, user.IsAdmin.ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),

            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:JwtSecretKey").Value));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: cred);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
        #endregion

        #region CreatePasswordHash
        private void CreatePasswordHash(string password, out byte[] hash, out byte[] salt)
        {
            using (var hmac = new HMACSHA512())
            {
                salt = hmac.Key;
                hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }
        #endregion

        #region VerifyingPasswordHash
        private bool VerifyingPasswordHash(string password, byte[] hash, byte[] salt)
        {
            using (var hmac = new HMACSHA512(salt))
            {
                var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                return computeHash.SequenceEqual(hash);
            }
        }
        #endregion
    }
}
