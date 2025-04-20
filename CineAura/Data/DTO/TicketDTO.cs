namespace CineAura.Data.DTO
{
    public class TicketDTO
    {
        
            public int Id { get; set; }
            public int UserId { get; set; }
            public string? UserFullName { get; set; }
            public int ShowtimeId { get; set; }
            public string? MovieTitle { get; set; }
            public DateTime ShowtimeStartTime { get; set; }
            public int SeatId { get; set; }
            public DateTime PurchaseTime { get; set; }
        }
    }