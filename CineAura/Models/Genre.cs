using System.ComponentModel.DataAnnotations;

namespace CineAura.Models
{
    public class Genre
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Genre name is required")]
        [Display(Name = "Genre Name")]
        public string GenreName { get; set; }
    }
}
