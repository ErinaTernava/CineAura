using CineAura.Data.DTO;
using CineAura.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
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

        #region ByHallId
        [HttpGet("ByHallId")]
        public async Task<IActionResult> GetAllByHallId(int hallId)
        {
            try
            {
                var seats = await _seatService.GetAllByHallId(hallId);
                if (seats == null || seats.Count == 0)
                    return NotFound($"No seats found for Hall ID {hallId}");

                return Ok(seats);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        #endregion

        #region GetById
        [HttpGet("getById")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var seat = await _seatService.GetById(id);
                if (seat == null)
                    return NotFound($"Seat with ID {id} not found");

                return Ok(seat);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion
    }
}
