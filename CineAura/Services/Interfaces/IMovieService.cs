using CineAura.Data.DTO;

namespace CineAura.Services.Interfaces
{
    public interface IMovieService
    {
        Task<List<MovieDTO>> GetAll();
        Task<MovieDTO> GetById(int id);
        Task<bool> Save(MovieDTO movie);
        Task<bool> Update(int id, MovieDTO movie);
        Task<bool> Delete(int id);
    }
}