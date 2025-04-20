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

        [HttpGet("hallid")]
        public async Task<IActionResult> GetAllByHallId(int hallId)
        {
            try
            {
                var seats = await _seatService.GetAllByHallId(hallId);
                return Ok(seats);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getbyid")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var seat = await _seatService.GetById(id);
                if (seat == null)
                    return NotFound();

                return Ok(seat);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Save([FromBody] SeatDTO dto)
        {
            try
            {
                var result = await _seatService.Save(dto);
                return result ? Ok("Seat u shtua me sukses") : BadRequest("Dështoi shtimi i vendit");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update(int id, [FromBody] SeatDTO dto)
        {
            try
            {
                var result = await _seatService.Update(id, dto);
                return result ? Ok("Seat u përditësua me sukses") : NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpDelete("delete")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var result = await _seatService.Delete(id);
                return result ? Ok("Seat u fshi me sukses") : NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}

