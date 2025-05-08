using CineAura.Data.DTO;
using CineAura.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CineAura.Services.Interfaces
{
    public interface IHallService
    {
        Task<List<HallDTO>> GetByMovieId(int movieId);
        Task<List<HallDTO>> GetAll();
        Task<HallDTO> GetById(int id);
        Task<bool> Save(HallDTO hall);
        Task<HallDTO> Update(int id, HallDTO hall);
        Task<bool> Delete(int id);

    }
}
