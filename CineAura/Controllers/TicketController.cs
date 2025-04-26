using CineAura.Data.DTO;
using CineAura.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CineAura.Controllers
{ 
    
        [ApiController]
        [Route("api/[controller]")]
        public class TicketController : ControllerBase
        {
            private readonly ITicketService _service;

            public TicketController(ITicketService ticketService)
            {
                _service = ticketService;
            }

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
            public async Task<IActionResult> Delete( int ticketId)
            {
                try
                {
                    var result= await _service.Delete(ticketId);
                    return Ok(result);
                }
                catch (Exception ex)
                {

                return BadRequest(ex.Message);
                }
            }
        }
         #endregion
}

