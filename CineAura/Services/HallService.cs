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
    public class HallService : IHallService
    {
        private readonly AppDbContext _context;

        public HallService(AppDbContext context)
        {
            _context = context;
        }

        #region GetByMovieId
        public async Task<List<HallDTO>> GetByMovieId(int movieId)
        {
            try
            {
               
                var halls = await _context.Showtime
                    .Where(s => s.MovieId == movieId) 
                    .Select(s => s.Hall) 
                    .ToListAsync();

                if (halls == null || halls.Count == 0)
                    return new List<HallDTO>();

                return halls.Adapt<List<HallDTO>>();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while retrieving halls.");
            }
        }
        #endregion

        #region GetAll 
        public async Task<List<HallDTO>> GetAll()
        {
            return await _context.Hall
                .Select(h => new HallDTO
                {
                    Id = h.Id,
                    HallName = h.HallName,
                    HallType = h.HallType,
                    CapacityOfSeats = h.CapacityOfSeats
                })
                .ToListAsync();
        }

        #endregion

        #region GetById
        public async Task<HallDTO> GetById(int id)
        {
            try
            {
                var movie = await _context.Hall.FirstOrDefaultAsync(x => x.Id == id);
                if (movie == null)
                {
                    throw new KeyNotFoundException($"hall with ID {id} not found");
                }
                return movie.Adapt<HallDTO>();
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
                throw new Exception("An error occurred while saving the hall.");
            }
        }
        #endregion

        #region Update
        public async Task<HallDTO> Update(int id, HallDTO hall)
        {
            try
            {
                var obj = await _context.Hall.FirstOrDefaultAsync(x => x.Id == id);
                if (obj == null)
                    return null;

                obj.HallName = hall.HallName;
                obj.HallType = hall.HallType;
                obj.CapacityOfSeats = hall.CapacityOfSeats;

                await _context.SaveChangesAsync();

                return obj.Adapt<HallDTO>();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while updating the hall.");
            }
        }
        #endregion

        #region Delete
        public async Task<bool> Delete(int id)
        {
            try
            {
                var hall = await _context.Hall.FindAsync(id);
                if (hall == null) return false;

                _context.Hall.Remove(hall);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred while deleting the hall.");
            }
        }
        #endregion
    }
}
