using CineAura.Data;
using CineAura.Data.DTO;
using CineAura.Models;
using CineAura.Services.Interfaces;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace CineAura.Services
{
    public class MovieService : IMovieService
    {
        private readonly AppDbContext _context;
        public MovieService(AppDbContext context)
        {
            _context = context;
        }

        #region GetAll 
        public async Task<List<MovieDTO>> GetAll()
        {
            try
            {
                return _context.Movie.ToListAsync().Adapt<List<MovieDTO>>();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred");
            }
        }
        #endregion

        #region GetById
        public async Task<MovieDTO> GetById(int id)
        {
            try
            {
                return _context.Movie.FirstOrDefaultAsync(x => x.Id == id).Adapt<MovieDTO>();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred");
            }
        }
        #endregion

        #region GetByGenre

        public async Task<List<MovieDTO>> GetByGenre(int genreId)
        {
            try
            {
                var movies = await _context.Movie
                    .Where(x => x.GenreId == genreId)
                    .ToListAsync();

                return movies.Adapt<List<MovieDTO>>();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred");
            }
        }

        #endregion

        #region Save
        public async Task<bool> Save(MovieDTO movie)
        {
            try
            {
                var model = movie.Adapt<Movie>();
                var obj = _context.Movie.Add(model);
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
        public async Task<bool> Update(int id, MovieDTO movie)
        {
            try
            {
                var obj = _context.Movie.FirstOrDefault(x => x.Id == id);
                if (obj == null)
                    return false;

                obj.Title = movie.Title;
                obj.Description = movie.Description;
                obj.Duration = movie.Duration;  
                obj.ReleaseDate = movie.ReleaseDate;
                obj.EndDate = movie.EndDate;
                obj.GenreId = movie.GenreId;
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
                var obj = _context.Movie.FirstOrDefault(x => x.Id == id);
                _context.Movie.Remove(obj);
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