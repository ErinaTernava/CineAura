using CineAura.Data.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CineAura.Services.Interfaces
{
    public interface IShowtimeService
	{
		Task<List<ShowtimeDisplayDTO>> GetAll();
        Task<ShowtimeDisplayDTO> GetById(int id);
        Task<List<ShowtimeDisplayDTO>> GetByMovie(int movieId);
		Task<bool> Save(ShowtimeDTO showtime);
		Task<ShowtimeDTO> Update(int id, ShowtimeDTO showtime);
		Task<bool> Delete(int id);
	}
}
