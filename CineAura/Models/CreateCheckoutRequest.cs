namespace CineAura.Models
{
    public class CreateCheckoutRequest
    {
        public List<Ticket> Tickets { get; set; }
        public string UserEmail { get; set; }
    }
}
