using CineAura.Data;
using CineAura.Data.DTO;
using CineAura.Migrations;
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
                var movies = await _context.Movie.ToListAsync();
                return movies.Adapt<List<MovieDTO>>();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw new Exception("An error occurred while retrieving movies.");
            }
        }
        #endregion

        #region GetById
        public async Task<MovieDTO> GetById(int id)
        {
            try
            {
                var movie = await _context.Movie.FirstOrDefaultAsync(x => x.Id == id);
                if (movie == null)
                    throw new KeyNotFoundException($"Movie with ID {id} not found");

                return movie.Adapt<MovieDTO>();
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

        #region SearchMovies
        public async Task<IEnumerable<Movie>> SearchMovies(string query)
        {
            try
            {
                var moviesQuery = _context.Movie.AsQueryable();

                if (!string.IsNullOrEmpty(query))  
                    moviesQuery = moviesQuery.Where(m => m.Title.Contains(query));

                var result = await moviesQuery.ToListAsync();

                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in SearchMovies: {ex.Message}"); 
                throw new Exception("An error occurred while searching for movies.");
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