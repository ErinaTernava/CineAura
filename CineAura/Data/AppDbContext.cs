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
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Hall> Hall { get; set; }
        public DbSet<Seat> Seat { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Movie> Movie { get; set; }
        public DbSet<Showtime> Showtime { get; set; }
        public DbSet<Ticket> Ticket { get; set; }
        public DbSet<CartTicket> CartTicket { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<EmailConfig> EmailConfig { get; set; }
        public DbSet<PasswordReset> PasswordReset { get; set; }
    } 
}