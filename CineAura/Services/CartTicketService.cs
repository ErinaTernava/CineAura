using CineAura.Data;
using CineAura.Data.DTO;
using CineAura.Models;
using CineAura.Services.Interfaces;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace CineAura.Services
{
    public class CartTicketService : ICartTicketService
    {
        private readonly AppDbContext _context;

        public CartTicketService(AppDbContext context)
        {
            _context = context;
        }

        #region AddTicket
        public async Task<bool> AddTicket(CartTicketDTO dto)
        {
            try
            {
                var cartExists = await _context.Carts.AnyAsync(c => c.Id == dto.CartId);
                var ticketExists = await _context.Ticket.AnyAsync(t => t.Id == dto.TicketId);
                var seatExists = await _context.Seat.AnyAsync(s => s.Id == dto.SeatId);

                if (!cartExists || !ticketExists || !seatExists)
                    return false;

                var cartTicket = dto.Adapt<CartTicket>();

                await _context.CartTicket.AddAsync(cartTicket);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred");
            }
        }
        #endregion

        #region remove
        public async Task<bool> Remove(int ticketId)
        {
            try
            {
                var cartTicket = await _context.CartTicket
                    .FirstOrDefaultAsync(ct => ct.TicketId == ticketId);

                if (cartTicket == null)
                    return false;

                _context.CartTicket.Remove(cartTicket);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred");
            }
        }
        #endregion
    }
}
