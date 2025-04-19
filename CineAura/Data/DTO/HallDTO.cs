using System.ComponentModel.DataAnnotations;

namespace CineAura.Data.DTO
{
    public class HallDTO

    {
        public int Id { get; set; }
        public string HallName { get; set; }
        public string HallType { get; set; }
        public int CapacityOfSeats { get; set; }
    }
}

