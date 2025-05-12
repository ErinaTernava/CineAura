using CineAura.Data.DTO;
using CineAura.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CineAura.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailConfigController : ControllerBase
    {
        private readonly IEmailConfigService _service;

        public EmailConfigController(IEmailConfigService service)
        {
            _service = service;
        }

        #region Create
        [HttpPost("create")]
        public async Task<IActionResult> Create(EmailConfigDTO dto)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);

                var result = await _service.Create(dto);
                if (result.StartsWith("SMTP test failed") || result.StartsWith("An email configuration already exists"))
                    return BadRequest(result);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion

        #region Get
        [HttpGet("get")]
        public async Task<IActionResult> Get()
        {
            try
            {
                var email = await _service.Get();
                return Ok(email);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion

        #region Update

        [HttpPut("update")]
        public async Task<IActionResult> Update(int id, EmailConfigDTO request)
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
