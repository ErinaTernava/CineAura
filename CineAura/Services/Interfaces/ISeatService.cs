using CineAura.Data.DTO;
using CineAura.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CineAura.Services.Interfaces
{

    public interface ISeatService
    {
        Task<List<SeatDTO>> GetSeatByHallIdAsync(int hallId);
        Task<SeatDTO> GetSeatByIdAsync(int id);
        Task<SeatDTO> CreateSeatAsync(SeatDTO seatDto);
        Task<bool> UpdateSeatAsync(int id, SeatDTO seatDto);
        Task<bool> DeleteSeatAsync(int id);
    }
}
