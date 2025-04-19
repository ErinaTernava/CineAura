using CineAura.Data.DTO;
using CineAura.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;

namespace CineAura.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class SeatController : ControllerBase
    {
        private readonly ISeatService _seatService;

        public SeatController(ISeatService seatService)
        {
            _seatService = seatService;
        }

        [HttpGet("hall/{hallId}")]
        public async Task<IActionResult> GetByHallId(int hallId)
        {
            try
            {
                var seats = await _seatService.GetSeatByHallIdAsync(hallId);
                return Ok(seats);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Gabim ne server: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var seat = await _seatService.GetSeatByIdAsync(id);
                return seat == null ? NotFound() : Ok(seat);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Gabim ne sever: {ex.Message}");
            }

        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SeatDTO dto)
        {
            try
            {
                var createdSeat = await _seatService.CreateSeatAsync(dto);
                return CreatedAtAction(nameof(Get), new { id = createdSeat.Id }, createdSeat);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Gabim ne server: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] SeatDTO dto)
        {
            try
            {
                var updated = await _seatService.UpdateSeatAsync(id, dto);
                return updated ? NoContent() : NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Gabim ne server: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var deleted = await _seatService.DeleteSeatAsync(id);
                return deleted ? NoContent() : NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Gabim në server: {ex.Message}");
            }
        }

    }
}

