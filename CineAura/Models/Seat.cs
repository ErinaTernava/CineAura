using System.ComponentModel.DataAnnotations;

namespace CineAura.Models
{
    public class Seat
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int HallId { get; set; }
        public Hall Hall { get; set; }

        [Required]
        public string Row { get; set; }
        public int SeatNumber { get; set; }

    }
}

