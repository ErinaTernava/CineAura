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

    public class HallController : ControllerBase
    {
        private readonly IHallService _hallService;

        public HallController(IHallService hallService)
        {
            _hallService = hallService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var halls = await _hallService.GetAllHallsAsync();
                return Ok(halls);
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
                var hall = await _hallService.GetHallByIdAsync(id);
                return hall == null ? NotFound() : Ok(hall);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Gabim ne server: {ex.Message}");
            }

        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] HallDTO dto)
        {
            try
            {
                var newHall = await _hallService.CreateHallAsync(dto);
                return CreatedAtAction(nameof(Get), new { id = newHall.Id }, newHall);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Gabim ne server: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] HallDTO dto)
        {
            try
            {
                var updated = await _hallService.UpdateHallAsync(id, dto);
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
                var deleted = await _hallService.DeleteHallAsync(id);
                return deleted ? NoContent() : NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Gabim në server: {ex.Message}");
            }
        }
    }
}

