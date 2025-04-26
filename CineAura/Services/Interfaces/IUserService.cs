using CineAura.Data.DTO;

namespace CineAura.Services.Interfaces
{
    public interface IUserService
    {
        Task<List<UserDTO>> GetAll();
        Task<UserDTO> GetById(int id);
        Task<bool> Update(int id, UserDTO user);
        Task<bool> Delete(int id);
    }
}
