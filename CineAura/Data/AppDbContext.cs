using CineAura.Models;
using Microsoft.EntityFrameworkCore;

namespace CineAura.Data
{
    public class AppDbContext : DbContext
    {

        private readonly IConfiguration _configuration;
        public AppDbContext(DbContextOptions<AppDbContext> options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
        }
        public DbSet<User> User { get; set; }
    }
}
