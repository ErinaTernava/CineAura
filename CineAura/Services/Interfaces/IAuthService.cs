using CineAura.Data.DTO;
using CineAura.Models;

namespace CineAura.Services.Interfaces
{
    public interface IAuthService
    {
        Task<UserDTO> Register(UserRegistrationDTO request);
        Task<string> Login(UserLoginDTO request);
        Task<UserDTO> ChangePassword(int id, ChangePasswordDTO request);

    }
}
