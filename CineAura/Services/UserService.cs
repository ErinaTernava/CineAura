using CineAura.Data;
using CineAura.Data.DTO;
using CineAura.Services.Interfaces;
using Mapster;
using Microsoft.EntityFrameworkCore;
using CineAura.Models;


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
                var config = TypeAdapterConfig<User, UserDTO>.NewConfig()
          .Map(dest => dest.Role, src => src.IsAdmin ? "Admin" : "User");

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
        public async Task<UserDTO> Update(int id, UserDTO userDto)
        {
            try
            {
                var obj = await _context.User.FirstOrDefaultAsync(x => x.Id == id);
                if (obj == null)
                    return null;

                obj.FirstName = userDto.FirstName;
                obj.LastName = userDto.LastName;
                obj.Email = userDto.Email;

                await _context.SaveChangesAsync();

                return obj.Adapt<UserDTO>();
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
