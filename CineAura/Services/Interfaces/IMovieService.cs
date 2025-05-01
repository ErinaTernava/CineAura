using CineAura.Data.DTO;
using CineAura.Models;
using System.Threading.Tasks;

namespace CineAura.Services.Interfaces
{
    public interface IMovieService
    {
        Task<List<MovieDTO>> GetAll();
        Task<MovieDTO> GetById(int id);
        Task<List<MovieDTO>> GetByGenre(int genreId);
        Task<bool> Save(MovieDTO movie);
        Task<bool> Update(int id, MovieDTO movie);
        Task<bool> Delete(int id);
       
        Task<IEnumerable<Movie>> SearchMovies(string query);


    }
}