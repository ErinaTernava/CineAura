using CineAura.Data.DTO;
using CineAura.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using CineAura.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CineAura.Controllers
{
   
    
        [ApiController]
        [Route("api/[controller]")]
        public class CartController : ControllerBase
        {
            private readonly ICartService _service;

            public CartController(ICartService service)
            {
                _service = service;
            }

            #region GetUserById

            [HttpGet("user")]
            public async Task<IActionResult> GetByUserId(int userId)
            {
                try
                {
                    var cart = await _service.GetByUserId(userId);
                    if (cart == null)
                        return NotFound("Cart not found.");

                    return Ok(cart);
                }
                catch (Exception ex)
                {
                return BadRequest(ex.Message);
                }   
             }
            #endregion

            #region Create
            [HttpPost("create")]
            public async Task<IActionResult> Create(int userId)
            {
                try
                {
                    var cart = await _service.Create(userId);
                    return Ok(cart);
                }
                catch (Exception ex)
                {
                return BadRequest(ex.Message);
                }
            }
            #endregion

            #region MarkCartAsPaid
            [HttpPut("pay")]
            public async Task<IActionResult> MarkAsPaid(int cartId)
            {
                try
                {
                    var success = await _service.MarkCartAsPaid(cartId);
                    if (!success)
                        return NotFound("Cart not found.");

                    return Ok("Cart marked as paid.");
                }
                catch (Exception ex)
                {
                return BadRequest(ex.Message);
                }
            }
            #endregion

            #region Delete
            [HttpDelete("delete")]
            public async Task<IActionResult> Delete(int cartId)
            {
                try
                {
                    var success = await _service.Delete(cartId);
                    if (!success)
                        return NotFound("Cart not found.");

                    return Ok("Cart deleted.");
                }
                catch (Exception ex)
                {
                return BadRequest(ex.Message);
                }
            }
            #endregion
        }
    }
