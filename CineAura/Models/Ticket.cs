using System.ComponentModel.DataAnnotations;

namespace CineAura.Models
{
    public class Ticket
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }
        public User User { get; set; }

        [Required]
        public int ShowtimeId { get; set; }
        public Showtime Showtime { get; set; }


        [Required]
        public int SeatId { get; set; }
        public Seat Seat { get; set; }

        public DateTime PurchaseTime { get; set; }
    }
}
