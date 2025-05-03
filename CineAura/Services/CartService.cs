using CineAura.Models;
using CineAura.Data;
using CineAura.Services.Interfaces;
using CineAura.Data.DTO;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace CineAura.Services
{
    public class CartService : ICartService
    {
        private readonly AppDbContext _context;

        public CartService(AppDbContext context)
        {
            _context = context;
        }

        #region GetByUserId
        public async Task<CartDTO?> GetByUserId(int userId)
        {
            try
            {
                var cart = await _context.Carts
                    .Include(c => c.User)
                    .FirstOrDefaultAsync(c => c.UserId == userId && !c.IsPaid);

                return cart?.Adapt<CartDTO>();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred");
            }
        }
        #endregion

        #region Create
        public async Task<CartDTO?> Create(int userId)
        {
            try
            {
                var existingCart = await _context.Carts
                    .FirstOrDefaultAsync(c => c.UserId == userId && !c.IsPaid);

                if (existingCart != null)
                    return existingCart.Adapt<CartDTO>();

                var newCart = new Cart
                {
                    UserId = userId,
                    IsPaid = false
                };

                _context.Carts.Add(newCart);
                await _context.SaveChangesAsync();

                return newCart.Adapt<CartDTO>();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred");
            }
        }
        #endregion

        #region MarkCartAsPaid
        public async Task<bool> MarkCartAsPaid(int cartId)
        {
            try
            {
                var cart = await _context.Carts.FindAsync(cartId);
                if (cart == null) return false;

                cart.IsPaid = true;
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred");
            }
        }
        #endregion

        #region Delete
        public async Task<bool> Delete(int cartId)
        {
            try
            {
                var cart = await _context.Carts.FindAsync(cartId);
                if (cart == null) return false;

                _context.Carts.Remove(cart);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred");
            }
        }
        #endregion
    }
}