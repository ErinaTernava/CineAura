using CineAura.Data.DTO;
using CineAura.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CineAura.Services.Interfaces
{
    public interface IHallService
    {
        Task<List<HallDTO>> GetAll();
        Task<HallDTO> GetById(int id);
        Task<bool> Save(HallDTO hall);
        Task<bool> Update(int id, HallDTO hallDto);
        Task<bool> Delete(int id);
    }
}
