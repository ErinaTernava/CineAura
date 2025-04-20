using CineAura.Data.DTO;
using CineAura.Migrations;

namespace CineAura.Services.Interfaces
{
    public interface ICartService
    {
        Task<CartDTO> GetByUserId(int userId);
        Task<CartDTO> Create(int userId);
        Task<bool> MarkCartAsPaid(int cartId);
        Task<bool> Delete(int cartId);
    }
}
