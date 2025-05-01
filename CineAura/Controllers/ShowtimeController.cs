using CineAura.Data.DTO;
using CineAura.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CineAura.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShowtimeController : ControllerBase
    {
        private readonly IShowtimeService _service;
        public ShowtimeController(IShowtimeService service)
        {
            _service = service;
        }


        #region GetById

        [HttpGet("getbyid")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var movie = await _service.GetById(id);
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

        #region GetByMovie
        [HttpGet("getByMovie")]
        public async Task<IActionResult> GetByMovie(int movieId)
        {
            try
            {
                var showtime = await _service.GetByMovie(movieId);
                if (showtime == null)
                    return NotFound();

                return Ok(showtime);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion

        #region Save
        [HttpPost("save")]
        public async Task<IActionResult> Save(ShowtimeDTO request)
        {
            try
            {
                var saved = await _service.Save(request);
                if (!saved)
                    return BadRequest("Failed to save showtime");

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
        public async Task<IActionResult> Update(int id, ShowtimeDTO request)
        {
            try
            {
                var updated = await _service.Update(id, request);
                if (!updated)
                    return NotFound();

                return Ok(updated);
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
                var deleted = await _service.Delete(id);
                return Ok(deleted);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion
    }
}
