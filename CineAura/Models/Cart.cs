using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CineAura.Models
{
    public class Cart
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        public User User { get; set; }

        [Required]       
        public bool IsPaid { get; set; } = false;
        public List<CartTicket> CartTicket { get; set; }


    }
}
