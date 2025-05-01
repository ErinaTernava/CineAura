using CineAura.Data;
using CineAura.Data.DTO;
using CineAura.Models;
using CineAura.Services.Interfaces;
using Mapster;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CineAura.Services
{
    public class ShowtimeService : IShowtimeService
    {
        private readonly AppDbContext _context;
        public ShowtimeService(AppDbContext context)
        {
            _context = context;
        }

       

        #region GetByMovieAndHall
        public async Task<List<ShowtimeDTO>> GetByMovie(int movieId)
        {
            try
            {
                var showtime = await _context.Showtime
                    .Where(x => x.MovieId == movieId)
                    .ToListAsync();
            

                if (showtime == null)
                    throw new KeyNotFoundException($"Showtime for Movie ID {movieId} not found");

                return showtime.Adapt<List<ShowtimeDTO>>();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred");
            }
        }
        #endregion


        #region Save
        public async Task<bool> Save(ShowtimeDTO showtime)
        {
            try
            {
                var model = showtime.Adapt<Showtime>();
                _context.Showtime.Add(model);
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
        public async Task<bool> Update(int id, ShowtimeDTO showtime)
        {
            try
            {
                var obj = await _context.Showtime.FirstOrDefaultAsync(x => x.Id == id);
                if (obj == null)
                    return false;

                obj.MovieId = showtime.MovieId;
                obj.HallId = showtime.HallId;
                obj.StartTime = showtime.StartTime;
                obj.TicketPrice = showtime.TicketPrice;

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
                var obj = await _context.Showtime.FirstOrDefaultAsync(x => x.Id == id);
                if (obj == null)
                    return false;

                _context.Showtime.Remove(obj);
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
