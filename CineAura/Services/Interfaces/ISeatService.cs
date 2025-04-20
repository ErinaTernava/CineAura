using CineAura.Data.DTO;
using CineAura.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CineAura.Services.Interfaces
{

    public interface ISeatService
    {
        Task<List<SeatDTO>> GetAllByHallId(int hallId);
        Task<SeatDTO> GetById(int id);
        Task<bool> Save(SeatDTO seatDto);
        Task<bool> Update(int id, SeatDTO seatDto);
        Task<bool> Delete(int id);
    }
}
