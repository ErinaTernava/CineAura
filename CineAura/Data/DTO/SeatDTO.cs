using System.ComponentModel.DataAnnotations;

namespace CineAura.Data.DTO
{

    public class SeatDTO
    {
        public int Id { get; set; }
        public string Row { get; set; }
        public int SeatNumber { get; set; }
        public int HallId { get; set; }
        public bool isOccupied { get; set; }
    }
}
