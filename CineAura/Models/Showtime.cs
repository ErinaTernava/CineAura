using System.ComponentModel.DataAnnotations;

namespace CineAura.Models
{
    public class Showtime
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int MovieId { get; set; }
        public Movie Movie { get; set; }

        [Required]
        public int HallId { get; set; }
        public Hall Hall { get; set; }
        public DateTime StartTime { get; set; }
        public decimal TicketPrice { get; set; }

    }
}
