using System.ComponentModel.DataAnnotations;

namespace CineAura.Models
{
    public class PasswordReset
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public string Email { get; set; }
        
        [Required]
        [MaxLength(6)]
        public string Code { get; set; }
        public DateTime Expiration { get; set; }
        public bool isUsed { get; set; }
    }
}
