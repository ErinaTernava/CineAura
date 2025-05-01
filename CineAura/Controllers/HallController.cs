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

    }
}

