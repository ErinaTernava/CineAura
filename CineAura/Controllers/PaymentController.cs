using CineAura.Data;
using CineAura.Services;
using CineAura.Services.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace CineAura.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IStripeService _service;
        private readonly AppDbContext _context;
        public PaymentController(IStripeService service, AppDbContext context)
        {
            _service = service;
            _context = context;
        }

        #region CheckoutSession
        [HttpPost("create-checkout-session")]
        public async Task<IActionResult> CreateCheckoutSession(int userId)
        {
            try
            {
                var cart = await _context.Carts
                    .Include(c => c.CartTicket)
                    .ThenInclude(ct => ct.Ticket)
                    .ThenInclude(t => t.Showtime)
                    .ThenInclude(s => s.Movie)
                    .FirstOrDefaultAsync(c => c.UserId == userId && !c.IsPaid);

                if (cart == null || !cart.CartTicket.Any())
                    return BadRequest("Cart is empty.");

                var user = await _context.User.FindAsync(userId);
                var tickets = cart.CartTicket.Select(ct => ct.Ticket).ToList();
                var sessionUrl = await _service.CreateCheckoutSession(tickets, user.Email);

                return Ok(new { url = sessionUrl });
            }
            catch (Exception ex)
            {
               return BadRequest(ex.Message);
            }
        }
        #endregion
    }
}
