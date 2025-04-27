using CineAura.Data;
using CineAura.Data.DTO;
using CineAura.Models;
using CineAura.Services.Interfaces;
using Mapster;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CineAura.Services
{
    public class SeatService : ISeatService
    {
        private readonly AppDbContext _context;

        public SeatService(AppDbContext context)
        {
            _context = context;
        }

        #region GetAllByHallId
        public async Task<List<SeatDTO>> GetAllByHallId(int hallId)
        {
            try
            {
                
                var seats = await _context.Seat
                    .Where(s => s.HallId == hallId) 
                    .ToListAsync();

                return seats.Adapt<List<SeatDTO>>(); 
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while retrieving seats.");
            }
        }
        #endregion

        #region GetById
        public async Task<SeatDTO> GetById(int id)
        {
            try
            {
                
                var seat = await _context.Seat.FirstOrDefaultAsync(s => s.Id == id);
                if (seat == null)
                    return null;

                return seat.Adapt<SeatDTO>(); 
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while retrieving the seat.");
            }
        }
        #endregion
    }
}
