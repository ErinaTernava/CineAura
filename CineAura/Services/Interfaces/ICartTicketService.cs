using CineAura.Data.DTO;
using CineAura.Models;

namespace CineAura.Services.Interfaces
{
    public interface ICartTicketService
    {
        Task<bool> AddTicket(CartTicketDTO dto);
        Task<bool> AddMultipleToCart(int cartId, List<int> ticketIds, List<int> seatIds);
        Task<bool> Remove(int TicketId);
    }
}
