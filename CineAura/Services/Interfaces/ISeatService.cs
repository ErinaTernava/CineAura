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
       
    }
}
