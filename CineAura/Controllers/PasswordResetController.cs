using CineAura.Data.DTO;
using CineAura.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CineAura.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PasswordResetController : ControllerBase
    {
        private readonly IPasswordResetService _service;

        public PasswordResetController(IPasswordResetService service)
        {
            _service = service;
        }

        #region Reset Code
        [HttpPost("code")]
        public async Task<IActionResult> ResetCode(string email)
        {
            try
            {
                var result = await _service.SendCode(email);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion

        #region Reset Password
        [HttpPost("reset")]
        public async Task<IActionResult> ResetPassword(PasswordResetRequestDTO request)
        {
            try
            {
                var success = await _service.ResetPass(request.Email, request.NewPassword);
                return Ok(new { message = "Password reset successful" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion

        #region Verify Code
        [HttpPost("verify")]
        public async Task<IActionResult> VerifyCode(PasswordVerifyDTO request)
        {
            try
            {
                var valid = await _service.VerifyCode(request.Email, request.Code);
                if (!valid) return BadRequest(new { message = "Code is either invalid or expired" });

                return Ok(valid);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion
    }
}
