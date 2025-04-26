using CineAura.Data;
using CineAura.Data.DTO;
using CineAura.Services.Interfaces;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace CineAura.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        #region Delete
        public async Task<bool> Delete(int id)
        {
            try
            {
                var obj =await _context.User.FirstOrDefaultAsync(x => x.Id == id);
                _context.User.Remove(obj);
                var result = await _context.SaveChangesAsync();

                return result > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred");
            }
        }
        #endregion

        #region GetAll
        public async Task<List<UserDTO>> GetAll()
        {
            try
            {
                return (await _context.User.ToListAsync()).Adapt<List<UserDTO>>();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred");
            }
        }
        #endregion

        #region GetById
        public async Task<UserDTO> GetById(int id)
        {
            try
            {
                var user = await _context.User.FirstOrDefaultAsync(x => x.Id == id);
                if (user == null)
                {
                    throw new KeyNotFoundException($"User with ID {id} not found");
                }
                return user.Adapt<UserDTO>();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("An error occurred");
            }
        }
        #endregion

        #region Update
        public async Task<bool> Update(int id, UserDTO user)
        {
            try
            {
                var obj = await _context.User.FirstOrDefaultAsync(x => x.Id == id);
                if (obj == null)
                    return false;

                obj.FirstName = user.FirstName;
                obj.LastName = user.LastName;
                obj.Email = user.Email;
               
                var result = await _context.SaveChangesAsync();

                return result > 0;
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
