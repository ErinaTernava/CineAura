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
                var halls = await _hallService.GetAll();
                return Ok(halls);
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
                var hall = await _hallService.GetById(id);
                if (hall == null)
                    return NotFound();

                return Ok(hall);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Save([FromBody] HallDTO dto)
        {
            try
            {
                var result = await _hallService.Save(dto);
                return result ? Ok("Hall u shtua me sukses") : BadRequest("Dështoi shtimi i sallës");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update(int id, [FromBody] HallDTO dto)
        {
            try
            {
                var result = await _hallService.Update(id, dto);
                return result ? Ok("Hall u përditësua me sukses") : NotFound();
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
                var result = await _hallService.Delete(id);
                return result ? Ok("Hall u fshi me sukses") : NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

