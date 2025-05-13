using System.ComponentModel.DataAnnotations;

namespace CineAura.Data.DTO
{
    public class PasswordResetDTO
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Code { get; set; }
        public DateTime Expiration { get; set; }
        public bool isUsed { get; set; }
    }
}
