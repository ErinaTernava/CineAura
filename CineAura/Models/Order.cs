using Microsoft.Extensions.Options;
using System;
using System.ComponentModel.DataAnnotations;

namespace CineAura.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }
        public User User { get; set; }
        public string? StripeSessionId { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime CreatedAt { get; set; }
        public int? CartId { get; set; }
        public Cart Cart { get; set; }
    }
}
