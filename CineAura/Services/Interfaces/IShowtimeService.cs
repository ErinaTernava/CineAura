using CineAura.Data.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CineAura.Services.Interfaces
{
    public interface IShowtimeService
	{
        Task<ShowtimeDTO> GetById(int id);
        Task<List<ShowtimeDTO>> GetByMovie(int movieId);
		Task<bool> Save(ShowtimeDTO showtime);
		Task<bool> Update(int id, ShowtimeDTO showtime);
		Task<bool> Delete(int id);
	}
}
