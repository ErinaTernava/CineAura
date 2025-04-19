using System.ComponentModel.DataAnnotations;

namespace CineAura.Models
{
    public class Movie
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        public int Duration { get; set; }
        public DateTime ReleaseDate { get; set; }
        public DateTime EndDate { get; set; }
        public byte[]? Photo { get; set; }

        public int GenreId { get; set; }
        public Genre Genre { get; set; }
    }
}