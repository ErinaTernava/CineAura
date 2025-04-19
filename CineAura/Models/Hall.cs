using System.ComponentModel.DataAnnotations;

namespace CineAura.Models
{
    public class Hall
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string HallName { get; set; }

        [Required]
        public string HallType { get; set; }

        [Required]
        public int CapacityOfSeats { get; set; }



    }
}
