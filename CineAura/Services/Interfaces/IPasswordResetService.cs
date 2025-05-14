using CineAura.Data.DTO;

namespace CineAura.Services.Interfaces
{
    public interface IPasswordResetService
    {
        Task<PasswordResetDTO> SendCode(string email);
        Task<bool> VerifyCode(string email, string code);
        Task<bool> ResetPass(string email, string newpass);
    }
}
