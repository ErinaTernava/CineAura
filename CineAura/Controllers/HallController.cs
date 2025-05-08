using CineAura.Data.DTO;
using CineAura.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Stripe;
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

        #region GetByMovieId
        [HttpGet("getByMovieId")]
        public async Task<IActionResult> GetByMovieId(int movieId)
        {
            try
            {
                var halls = await _hallService.GetByMovieId(movieId);
                if (halls == null || halls.Count == 0)
                    return NotFound($"No halls found for Movie ID {movieId}");

                return Ok(halls);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion
       
        #region GetById

        [HttpGet("getbyid")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var movie = await _hallService.GetById(id);
                if (movie == null)
                    return NotFound();

                return Ok(movie);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion

        #region GetAll
        [HttpGet("getAll")]
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
        #endregion

        #region Save
        [HttpPost("save")]
        public async Task<IActionResult> Save([FromBody] HallDTO request)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var saved = await _hallService.Save(request);
                if (!saved)
                    return BadRequest("Failed to save hall");

                return Ok(saved);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion

        #region Update
        [HttpPut("update")]
        public async Task<IActionResult> Update(int id, [FromBody] HallDTO request)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var result = await _hallService.Update(id, request);
                if (result == null)
                    return NotFound();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion

        #region Delete
        [HttpDelete("delete")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var result = await _hallService.Delete(id);
                if (!result)
                    return NotFound($"Hall with ID {id} not found");

                return Ok(new { success = true, message = "Hall deleted successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion
    }
}

