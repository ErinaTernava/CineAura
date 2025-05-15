using CineAura.Data.DTO;
using CineAura.Services;
using CineAura.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Linq.Expressions;

namespace CineAura.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly IMovieService _service;
        public MovieController(IMovieService service)
        {
            _service = service;
        }

        #region Get
        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var movies = await _service.GetAll();
                return Ok(movies);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion

        #region Get Genres
        [HttpGet("genres")]
        public async Task<IActionResult> GetGenres()
        {
            try
            {
                var genres = await _service.GetGenres();
                return Ok(genres);
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

        #region GetByGenre

        [HttpGet("bygenre")]
        public async Task<IActionResult> GetByGenre(int genreId)
        {
            try
            {
                var movies = await _service.GetByGenre(genreId);
                return Ok(movies);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion

        #region Save

        [HttpPost("save")]
        public async Task<IActionResult> Save(MovieDTO request)
        {
            try
            {
                var saved = await _service.Save(request);
                if (!saved)
                    return BadRequest("failed to save movie");

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
        public async Task<IActionResult> Update(int id, MovieDTO request)
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

        #region SearchMovie
        [HttpGet("search")]
        public async Task<IActionResult> SearchMovies([FromQuery] string query)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(query))
                    return BadRequest("Query is required.");

                var movies = await _service.SearchMovies(query);
                return Ok(movies);
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
