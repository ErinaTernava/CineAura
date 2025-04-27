using CineAura.Data.DTO;
using CineAura.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CineAura.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartTicketController : ControllerBase
    {
        private readonly ICartTicketService _service;

        public CartTicketController(ICartTicketService cartTicketService)
        {
            _service = cartTicketService;
        }

        #region AddTicket
        [HttpPost("add")]
        public async Task<IActionResult> AddTicket(CartTicketDTO dto)
        {
            try
            {
                if (dto == null)
                {
                    return BadRequest("Invalid data.");
                }

                var result = await _service.AddTicket(dto);

                if (!result)
                {
                    return BadRequest("Failed to add ticket.");
                }

                return Ok("Ticket added successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion

        #region Remove
        [HttpDelete("remove")]
        public async Task<IActionResult> Remove(int ticketId)
        {
            try
            {
                var result = await _service.Remove(ticketId);

                if (!result)
                {
                    return NotFound("Ticket not found.");
                }

                return Ok("Ticket removed successfully.");
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        #endregion
    }
}
