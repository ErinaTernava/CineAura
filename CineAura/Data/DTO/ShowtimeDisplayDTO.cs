namespace CineAura.Data.DTO
{
    public class ShowtimeDisplayDTO
    {
        public int Id { get; set; }
        public int MovieId { get; set; }
        public string MovieTitle { get; set; }
        public int HallId { get; set; }
        public string HallName { get; set; }
        public string HallType { get; set; }
        public DateTime StartTime { get; set; }
        public decimal TicketPrice { get; set; }
    }
}
