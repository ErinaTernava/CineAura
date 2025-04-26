
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


        #region TicketByUserID
        public async Task<List<TicketDTO?>> TicketByUserId(int id)
        {
            try
            {
                var ticket = await _context.Ticket
                    .Where(x => x.UserId == id)
                    .ToListAsync();

                return ticket.Adapt<List<TicketDTO>>();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred");
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


    }
}
