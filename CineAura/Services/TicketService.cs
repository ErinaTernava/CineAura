
using CineAura.Data;
using CineAura.Data.DTO;
using CineAura.Migrations;
using CineAura.Models;
using Mapster; 
using CineAura.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CineAura.Services
{
    public class TicketService : ITicketService 
    {
        private readonly AppDbContext _context;

        public TicketService(AppDbContext context)
        {
            _context = context;
        }

        #region CreateTicket
        public async Task<TicketDTO?> CreateTicket(int userId, int showtimeId, int seatId)
        {
            try
            {
                var isSeatTaken = await _context.Ticket
                    .AnyAsync(t => t.ShowtimeId == showtimeId && t.SeatId == seatId);

                if (isSeatTaken)
                    return null;

                var ticket = new Ticket
                {
                    UserId = userId,
                    ShowtimeId = showtimeId,
                    SeatId = seatId,
                    PurchaseTime = DateTime.UtcNow
                };

                await _context.Ticket.AddAsync(ticket);
                await _context.SaveChangesAsync();

                return ticket.Adapt<TicketDTO>();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while creating ticket");
            }
        }
        #endregion

        #region TicketByUserId
        public async Task<List<TicketDTO>> TicketByUserId(int id)
        {
            try
            {
                return await _context.CartTicket
                   .Where(ct => ct.Cart.UserId == id)
                   .Include(ct => ct.Ticket)
                   .ThenInclude(t => t.Showtime)
                   .ThenInclude(s => s.Movie)
                   .Include(ct => ct.Ticket)
                   .ThenInclude(t => t.Showtime)
                   .ThenInclude(s => s.Hall)
                   .Include(ct => ct.Ticket)
                   .ThenInclude(t => t.Seat)
                   .Select(ct => new TicketDTO
            {
                Id = ct.Ticket.Id,
                UserId = ct.Ticket.UserId,
                ShowtimeId = ct.Ticket.ShowtimeId,
                SeatId = ct.Ticket.SeatId,
                PurchaseTime = ct.Ticket.PurchaseTime,
                ShowtimeStartTime = ct.Ticket.Showtime.StartTime,
                TicketPrice = ct.Ticket.Showtime.TicketPrice,
                MovieTitle = ct.Ticket.Showtime.Movie.Title,
                MovieDuration = ct.Ticket.Showtime.Movie.Duration,
                HallName = ct.Ticket.Showtime.Hall.HallName,
                HallCapacity = ct.Ticket.Showtime.Hall.CapacityOfSeats,
                SeatNumber = ct.Ticket.Seat.SeatNumber,
                SeatRow = ct.Ticket.Seat.Row
            })
            .ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while fetching user tickets");
            }
        }
        #endregion

        #region DeleteTicket 
        public async Task<bool> Delete(int id)
        {
            try
            {
                var obj = _context.Ticket.FirstOrDefault(x => x.Id == id);
                _context.Ticket.Remove(obj);
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

        #region TakenSeats
        public async Task<List<int>> GetTakenSeatIds(int showtimeId)
        {
            try
            {
                return await _context.Ticket
                .Where(t => t.ShowtimeId == showtimeId &&
                        t.Order != null &&
                        t.Order.StripeSessionId != null)
                .Select(t => t.SeatId)
                .ToListAsync();
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
