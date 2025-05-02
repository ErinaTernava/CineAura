namespace CineAura.Data.DTO
{
    public class TicketDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ShowtimeId { get; set; }
        public int SeatId { get; set; }
        public DateTime PurchaseTime { get; set; }

        public DateTime ShowtimeStartTime { get; set; }
        public decimal TicketPrice { get; set; }

        public string MovieTitle { get; set; }
        public int MovieDuration { get; set; } 

        public string HallName { get; set; }
        public int HallCapacity { get; set; }

        public int SeatNumber { get; set; }
        public string SeatRow { get; set; }
        

    }
}