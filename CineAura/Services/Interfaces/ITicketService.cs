using CineAura.Data.DTO;

namespace CineAura.Services.Interfaces
{
    public interface ITicketService
    {
     
        Task<List<TicketDTO?>> TicketByUserId(int id);
        Task<bool> Delete(int id);
    }
}
