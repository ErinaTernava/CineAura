namespace CineAura.Data.DTO
{
    public class CartDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public bool IsPaid { get; set; } = false;
    }
}
