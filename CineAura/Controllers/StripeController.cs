using CineAura.Models;
using CineAura.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CineAura.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StripeController : ControllerBase
    {
        private readonly IStripeService _stripeService;

        public StripeController(IStripeService stripeService)
        {
            _stripeService = stripeService;
        }

        #region Webhook
        [HttpPost("webhook")]
        public async Task<IActionResult> StripeWebhook()
        {
            try
            {
                await _stripeService.HandleStripeWebhook(Request);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion
    }
}
