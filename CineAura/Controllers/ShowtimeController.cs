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

        #region Get
        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var showtimes = await _service.GetAll();
                return Ok(showtimes);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion 

        #region GetById

        [HttpGet("getbyid")]
        public async Task<IActionResult> GetById([FromQuery] int id)
        {
            try
            {
                var showtime = await _service.GetById(id);
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

        #region GetByMovie
        [HttpGet("getByMovie")]
        public async Task<IActionResult> GetByMovie(int movieId)
        {
            try
            {
                var showtimes = await _service.GetByMovie(movieId);
                return Ok(showtimes);
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
                    return BadRequest("failed to save showtime");

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
        public async Task<IActionResult> Update([FromQuery] int id, [FromBody] ShowtimeDTO request)
        {
            try
            {
                var result = await _service.Update(id, request);
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
                var result = await _service.Delete(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion
    }
}
