using System.ComponentModel.DataAnnotations;

namespace CineAura.Models
{
    public class User
    {

        [Key]
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        public byte[]? PasswordHash { get; set; }

        [Required]
        public byte[] PasswordSalt { get; set; }
        public bool IsAdmin { get; set; } = false;

        //public Cart? Cart { get; set; }
    }
}
