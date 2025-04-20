using CineAura.Data;
using CineAura.Data.DTO;
using CineAura.Models;
using CineAura.Services.Interfaces;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
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
                    .Where(x => x.HallId == hallId)
                    .ToListAsync();

                return seats.Adapt<List<SeatDTO>>();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred");
            }
        }
        #endregion

        #region GetById
        public async Task<SeatDTO> GetById(int id)
        {
            try
            {
                var seat = await _context.Seat.FirstOrDefaultAsync(x => x.Id == id);
                return seat.Adapt<SeatDTO>();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred");
            }
        }
        #endregion

        #region Save
        public async Task<bool> Save(SeatDTO seat)
        {
            try
            {
                var model = seat.Adapt<Seat>();
                _context.Seat.Add(model);
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

        #region Update
        public async Task<bool> Update(int id, SeatDTO seat)
        {
            try
            {
                var obj = await _context.Seat.FirstOrDefaultAsync(x => x.Id == id);
                if (obj == null)
                    return false;

                obj.Row = seat.Row;
                obj.SeatNumber = seat.SeatNumber;
                obj.HallId = seat.HallId;

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

        #region Delete
        public async Task<bool> Delete(int id)
        {
            try
            {
                var obj = await _context.Seat.FirstOrDefaultAsync(x => x.Id == id);
                if (obj == null)
                    return false;

                _context.Seat.Remove(obj);
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
