using CineAura.Data;
using CineAura.Models;
using CineAura.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Stripe;
using Stripe.Checkout;

namespace CineAura.Services
{
    public class StripeService : IStripeService
    {
        private readonly AppDbContext _context;
        private readonly StripeSettings _stripeSettings;
        public StripeService(AppDbContext context, IOptions<StripeSettings> stripeOptions)
        {
            _context = context;
            _stripeSettings = stripeOptions.Value;
        }

        #region CheckoutSession
        public async Task<string> CreateCheckoutSession(List<Ticket> tickets, string userEmail)
        {
            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string> { "card" },
                CustomerEmail = userEmail,
                Mode = "payment",
                SuccessUrl = "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
                CancelUrl = "https://localhost:3000/cancel",
                LineItems = tickets.Select(ticket => new SessionLineItemOptions
                {
                    Quantity = 1,
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        Currency = "usd",
                        UnitAmount = (long)(ticket.Showtime.TicketPrice * 100),
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = $"Movie Ticket - {ticket.Showtime.Movie.Title} ({ticket.SeatId})"
                        }
                    }
                }).ToList()
            };

            var service = new SessionService();
            var session = await service.CreateAsync(options);
            return session.Url;
        }
        #endregion

        #region HandleWebhook
        public async Task HandleStripeWebhook(HttpRequest request)
        {
            try
            {
                var json = await new StreamReader(request.Body).ReadToEndAsync();
                var signatureHeader = request.Headers["Stripe-Signature"];

                Event stripeEvent;
                try
                {
                    stripeEvent = EventUtility.ConstructEvent(json, signatureHeader, _stripeSettings.WebhookSecret);
                }
                catch (StripeException ex)
                {
                    throw new Exception("Webhook signature verification failed.", ex);
                }

                if (stripeEvent.Type == "checkout.session.completed")
                {
                    var session = stripeEvent.Data.Object as Session;
                    var customerEmail = session?.CustomerEmail;
                    if (string.IsNullOrEmpty(customerEmail))
                    {
                        Console.WriteLine("Customer email is null in session.");
                        return;
                    }
                    var sessionId = session.Id;

                    var user = await _context.User.FirstOrDefaultAsync(u => u.Email == customerEmail);
                    var cart = await _context.Carts
                        .Include(c => c.CartTicket)
                        .ThenInclude(ct => ct.Ticket)
                        .ThenInclude(t => t.Showtime)
                        .FirstOrDefaultAsync(c => c.UserId == user.Id && !c.IsPaid);                    

                    if (cart != null)
                    {
                        var total = cart.CartTicket.Sum(ct => ct.Ticket.Showtime.TicketPrice);

                        var order = new Order
                        {
                            UserId = user.Id,
                            StripeSessionId = sessionId,
                            TotalAmount = total,
                            CreatedAt = DateTime.UtcNow,
                            CartId = cart.Id
                        };
                        _context.Order.Add(order);

                        _context.CartTicket.RemoveRange(cart.CartTicket);

                        cart.IsPaid = true;
                        _context.SaveChanges();
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }          
        }
        #endregion
    }
}