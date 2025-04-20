using System.ComponentModel.DataAnnotations;

namespace CineAura.Models
{

    public class CartTicket
{
        public int Id { get; set; }

        public int CartId { get; set; }
        public Cart Cart { get; set; }

        public int TicketId { get; set; }
        public Ticket Ticket { get; set; }

        public int SeatId { get; set; }
        public Seat Seat { get; set; }
	
}
