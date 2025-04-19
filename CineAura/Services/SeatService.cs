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
    public class SeatService : ISeatService
    {
        private readonly AppDbContext _context;

        public SeatService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<SeatDTO>> GetSeatByHallIdAsync(int hallId)
        {
            return await _context.Seat
                .Where(s => s.HallId == hallId)
                .Select(s => new SeatDTO
                {
                    Id = s.Id,
                    Row = s.Row,
                    SeatNumber = s.SeatNumber,
                    HallId = s.HallId
                }).ToListAsync();
        }

        public async Task<SeatDTO> GetSeatByIdAsync(int id)
        {
            var seat = await _context.Seat.FindAsync(id);
            if (seat == null) return null;

            return new SeatDTO
            {
                Id = seat.Id,
                Row = seat.Row,
                SeatNumber = seat.SeatNumber,
                HallId = seat.HallId
            };
        }

        public async Task<SeatDTO> CreateSeatAsync(SeatDTO seatDto)
        {
            var seat = new Seat
            {
                Row = seatDto.Row,
                SeatNumber = seatDto.SeatNumber,
                HallId = seatDto.HallId
            };

            _context.Seat.Add(seat);
            await _context.SaveChangesAsync();

            seatDto.Id = seat.Id;
            return seatDto;
        }

        public async Task<bool> UpdateSeatAsync(int id, SeatDTO seatDto)
        {
            var seat = await _context.Seat.FindAsync(id);
            if (seat == null) return false;

            seat.Row = seatDto.Row;
            seat.SeatNumber = seatDto.SeatNumber;
            seat.HallId = seatDto.HallId;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteSeatAsync(int id)
        {
            var seat = await _context.Seat.FindAsync(id);
            if (seat == null) return false;

            _context.Seat.Remove(seat);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
