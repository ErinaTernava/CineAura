using CineAura.Services.Interfaces;
using System.Runtime.CompilerServices;

namespace CineAura.Services
{
    public static class ServiceCollectionExtentions
    {
        public static void AddScopedServices(this IServiceCollection services)
        {
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IHallService, HallService>();
            services.AddScoped<ISeatService, SeatService>();
            services.AddScoped<IMovieService, MovieService>();
            services.AddScoped<ICartService, CartService>();
            services.AddScoped<ITicketService, TicketService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IShowtimeService, ShowtimeService>();
        }
    }
}