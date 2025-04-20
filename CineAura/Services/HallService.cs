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
    public class HallService : IHallService
    {
        private readonly AppDbContext _context;

        public HallService(AppDbContext context)
        {
            _context = context;
        }

        #region Get
        public async Task<List<HallDTO>> GetAll()
        {
            try
            {
                return (await _context.Hall.ToListAsync()).Adapt<List<HallDTO>>();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred");
            }
        }
        #endregion

        #region GetById
        public async Task<HallDTO> GetById(int id)
        {
            try
            {
                var hall = await _context.Hall.FirstOrDefaultAsync(x => x.Id == id);
                return hall.Adapt<HallDTO>();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred");
            }
        }
        #endregion

        #region Save
        public async Task<bool> Save(HallDTO hall)
        {
            try
            {
                var model = hall.Adapt<Hall>();
                _context.Hall.Add(model);
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
        public async Task<bool> Update(int id, HallDTO hall)
        {
            try
            {
                var obj = await _context.Hall.FirstOrDefaultAsync(x => x.Id == id);
                if (obj == null)
                    return false;

                obj.HallName = hall.HallName;
                obj.HallType = hall.HallType;
                obj.CapacityOfSeats = hall.CapacityOfSeats;

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
                var obj = await _context.Hall.FirstOrDefaultAsync(x => x.Id == id);
                if (obj == null)
                    return false;

                _context.Hall.Remove(obj);
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
