using CineAura.Data.DTO;
using CineAura.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CineAura.Services.Interfaces
{
    public interface IHallService
    {
        Task<List<HallDTO>> GetByMovieId(int movieId);
        Task<HallDTO> GetById(int id);


    }
}
