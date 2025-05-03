
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
                return await _context.Ticket
                    .Where(x => x.UserId == id)
                    .Include(t => t.Showtime)
                        .ThenInclude(s => s.Movie)
                    .Include(t => t.Showtime)
                        .ThenInclude(s => s.Hall)
                    .Include(t => t.Seat)
                    .Select(t => new TicketDTO
                    {
                        Id = t.Id,
                        UserId = t.UserId,
                        ShowtimeId = t.ShowtimeId,
                        SeatId = t.SeatId,
                        PurchaseTime = t.PurchaseTime,
                        ShowtimeStartTime = t.Showtime.StartTime,
                        TicketPrice = t.Showtime.TicketPrice,
                        MovieTitle = t.Showtime.Movie.Title,
                        MovieDuration = t.Showtime.Movie.Duration,
                        HallName = t.Showtime.Hall.HallName,
                        HallCapacity = t.Showtime.Hall.CapacityOfSeats,
                        SeatNumber = t.Seat.SeatNumber,
                        SeatRow = t.Seat.Row,
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
                .Where(t => t.ShowtimeId == showtimeId)
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
