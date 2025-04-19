using CineAura.Data.DTO;
using CineAura.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CineAura.Services.Interfaces
{
    public interface IHallService
    {
        Task<List<HallDTO>> GetAllHallsAsync();
        Task<HallDTO> GetHallByIdAsync(int id);
        Task<HallDTO> CreateHallAsync(HallDTO hallDto);
        Task<bool> UpdateHallAsync(int id, HallDTO hallDto);
        Task<bool> DeleteHallAsync(int id);
    }
}
