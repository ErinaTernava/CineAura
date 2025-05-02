using CineAura.Data.DTO;

namespace CineAura.Services.Interfaces
{
    public interface ITicketService
    {
     
        Task<List<TicketDTO?>> TicketByUserId(int id);
        Task<TicketDTO?> CreateTicket(int userId, int showtimeId, int seatId);
        Task<bool> Delete(int id);
    }
}
