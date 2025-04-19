using CineAura.Data;
using CineAura.Data.DTO;
using CineAura.Models;
using CineAura.Services.Interfaces;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace CineAura.Services
{
    public class HallService : IHallService
    {
        private readonly AppDbContext _context;

        public HallService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<HallDTO>> GetAllHallsAsync()
        {
            return await _context.Hall.Select(h => new HallDTO
            {
                Id = h.Id,
                HallName = h.HallName,
                HallType = h.HallType,
                CapacityOfSeats = h.CapacityOfSeats
            }).ToListAsync();
        }

        public async Task<HallDTO> GetHallByIdAsync(int id)
        {
            var hall = await _context.Hall.FindAsync(id);
            if (hall == null) return null;

            return new HallDTO
            {
                Id = hall.Id,
                HallName = hall.HallName,
                HallType = hall.HallType,
                CapacityOfSeats = hall.CapacityOfSeats
            };
        }

        public async Task<HallDTO> CreateHallAsync(HallDTO hallDto)
        {
            var hall = new Hall
            {
                HallName = hallDto.HallName,
                HallType = hallDto.HallType,
                CapacityOfSeats = hallDto.CapacityOfSeats
            };

            _context.Hall.Add(hall);
            await _context.SaveChangesAsync();

            hallDto.Id = hall.Id;
            return hallDto;
        }

        public async Task<bool> UpdateHallAsync(int id, HallDTO hallDto)
        {
            var hall = await _context.Hall.FindAsync(id);
            if (hall == null) return false;

            hall.HallName = hallDto.HallName;
            hall.HallType = hallDto.HallType;
            hall.CapacityOfSeats = hallDto.CapacityOfSeats;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteHallAsync(int id)
        {
            var hall = await _context.Hall.FindAsync(id);
            if (hall == null) return false;

            _context.Hall.Remove(hall);
            await _context.SaveChangesAsync();
            return true;
        }
    }

}
