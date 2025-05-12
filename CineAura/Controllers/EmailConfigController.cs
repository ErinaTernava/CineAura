using CineAura.Data.DTO;
using CineAura.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

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
        [Produces("application/json")]
        public async Task<IActionResult> Create([FromBody] EmailConfigDTO dto)
        {
            Console.WriteLine($"Received create request: {JsonSerializer.Serialize(dto)}");

            try
            {
                if (!ModelState.IsValid)
                {
                    var errors = ModelState.Values
                        .SelectMany(v => v.Errors)
                        .Select(e => e.ErrorMessage);
                    Console.WriteLine($"Validation errors: {string.Join(", ", errors)}");
                    return BadRequest(new { message = "Validation failed", errors });
                }

                var result = await _service.Create(dto);
                Console.WriteLine($"Service result: {result}");

                if (result.StartsWith("SMTP test failed") || result.StartsWith("An email configuration"))
                {
                    return BadRequest(new { message = result });
                }

                return Ok(new { message = result });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex}");
                return BadRequest(new { message = ex.Message });
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

        #region Test
        [HttpPost("test")]
        public async Task<IActionResult> TestSmtp(EmailConfigDTO config)
        {
            try
            {
                await _service.TestSmtpConnection(config);
                return Ok(new { message = "SMTP connection successful!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        #endregion
    }
}
