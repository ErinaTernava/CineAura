using CineAura.Data.DTO;
using CineAura.Services;
using CineAura.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CineAura.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class TicketController : ControllerBase
    {
        private readonly ITicketService _service;
        private readonly ICartTicketService _cartTicketService;
        private readonly ICartService _cartService;

        public TicketController(ITicketService ticketService, ICartTicketService cartTicketService, ICartService cartService)
        {
            _service = ticketService;
            _cartService = cartService;
            _cartTicketService = cartTicketService;
        }

        #region AddToCart
        [HttpPost("addtocart")]
        public async Task<IActionResult> AddToCart([FromQuery] int userId, [FromQuery] int showtimeId, [FromQuery] string seatIds)
        {
            try
            {
                var seatIdList = seatIds.Split(',')
                .Select(id => int.TryParse(id, out var num) ? num : -1)
                .Where(id => id != -1)
                .ToList();

            if (!seatIdList.Any()) return BadRequest("Invalid seat IDs");

            var cart = await _cartService.GetByUserId(userId);
            if (cart == null) return BadRequest("Cart not found");

            var ticketIds = new List<int>();
            var successfulSeatIds = new List<int>();

            foreach (var seatId in seatIdList)
            {
                var ticket = await _service.CreateTicket(userId, showtimeId, seatId);
                if (ticket != null)
                {
                    ticketIds.Add(ticket.Id);
                    successfulSeatIds.Add(seatId);
                }
            }

            if (!ticketIds.Any()) return BadRequest("No seats available");

            var success = await _cartTicketService.AddMultipleToCart(cart.Id, ticketIds, successfulSeatIds);
            if (!success) return BadRequest("Failed to add to cart");

            return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion

        #region GetTicketsByUserId
        [HttpGet("ticketbyuser")]
        public async Task<IActionResult> TicketsByUserId(int userId)
        {
            try
            {
                var tickets = await _service.TicketByUserId(userId);
                if (tickets == null)
                {
                    return NotFound("No tickets found for this user.");
                }

                return Ok(tickets);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        #endregion

        #region Delete
        [HttpPost("delete")]
        public async Task<IActionResult> Delete(int ticketId)
        {
            try
            {
                var result = await _service.Delete(ticketId);
                return Ok(result);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        
         #endregion

        #region Remove
        [HttpDelete("remove")]
        public async Task<IActionResult> RemoveTicket(int ticketId)
        {
            try
            {
                bool removedFromCart = await _cartTicketService.Remove(ticketId);
                if (!removedFromCart) return NotFound("Ticket not found in cart");

                bool ticketDeleted = await _service.Delete(ticketId);
                if (!ticketDeleted) return NotFound("Ticket not found");

                return Ok("Ticket removed successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion

        #region TakenSeats
        [HttpGet("takenseats")]
        public async Task<IActionResult> GetTakenSeats([FromQuery] int showtimeId)
        {
            try
            {
                var takenSeatIds = await _service.GetTakenSeatIds(showtimeId);
                return Ok(takenSeatIds);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion
    }
}

