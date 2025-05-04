using CineAura.Models;

namespace CineAura.Services.Interfaces
{
    public interface IStripeService
    {
        Task<string> CreateCheckoutSession(List<Ticket> tickets, string userEmail);
        Task HandleStripeWebhook(HttpRequest request);
    }
}
