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


    }
}
