namespace CineAura.Data.DTO
{
    public class MovieDisplayDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Duration { get; set; }
        public DateTime ReleaseDate { get; set; }
        public DateTime EndDate { get; set; }
        public byte[]? Photo { get; set; }
        public int GenreId { get; set; }
        public string GenreName { get; set; }
    }
}
