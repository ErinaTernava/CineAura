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

        #region GetAll 
        public async Task<List<ShowtimeDisplayDTO>> GetAll()
        {
            try
            {
                var showtimes = await _context.Showtime
                    .Include(s => s.Movie)
                    .Include(s => s.Hall)
                    .Select(s => new ShowtimeDisplayDTO
                    {
                        Id = s.Id,
                        MovieId = s.MovieId,
                        MovieTitle = s.Movie.Title,
                        HallId = s.HallId,
                        HallName = s.Hall.HallName,
                        HallType = s.Hall.HallType,
                        StartTime = s.StartTime,
                        TicketPrice = s.TicketPrice
                    })
                .ToListAsync();
                return showtimes;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw new Exception("An error occurred while retrieving showtimes.");
            }

        }
        #endregion

        #region GetByMovie
        public async Task<List<ShowtimeDisplayDTO>> GetByMovie(int movieId)
        {
            try
            {
                var showtimes = await _context.Showtime
                    .Include(s => s.Hall)
                    .Include(s => s.Movie)
                    .Where(x => x.MovieId == movieId)
                    .Select(s => new ShowtimeDisplayDTO
                    {
                        Id = s.Id,
                        MovieId = s.MovieId,
                        MovieTitle = s.Movie.Title,
                        HallId = s.HallId,
                        HallName = s.Hall.HallName,
                        HallType = s.Hall.HallType,
                        StartTime = s.StartTime,
                        TicketPrice = s.TicketPrice
                    })
                    .ToListAsync();

                return showtimes;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred");
            }
        }
        #endregion

        #region GetById
        public async Task<ShowtimeDisplayDTO> GetById(int id)
        {
            try
            {
                var showtime = await _context.Showtime
                    .Include(s => s.Movie)
                    .Include(s => s.Hall)
                    .FirstOrDefaultAsync(x => x.Id == id);

                if (showtime == null) return null;

                return new ShowtimeDisplayDTO
                {
                    Id = showtime.Id,
                    MovieId = showtime.MovieId,
                    HallId = showtime.HallId,
                    StartTime = showtime.StartTime,
                    TicketPrice = showtime.TicketPrice,
                };
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
                var obj = _context.Showtime.Add(model);
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
        public async Task<ShowtimeDTO> Update(int id, ShowtimeDTO showtime)
        {
            try
            {
                var obj = _context.Showtime.FirstOrDefault(x => x.Id == id);
                if (obj == null)
                    return null;

                obj.MovieId = showtime.MovieId;
                obj.HallId = showtime.HallId;
                obj.StartTime = showtime.StartTime;
                obj.TicketPrice = showtime.TicketPrice;
                await _context.SaveChangesAsync();

                var result = await _context.SaveChangesAsync();
                return obj.Adapt<ShowtimeDTO>();
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
