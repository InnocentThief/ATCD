using System.ComponentModel.DataAnnotations;

namespace ATCD.Backend.Dto.Web
{
    public class AuthorDto
    {
        [Required]
        public int AuthorKey { get; set; }

        [Required]
        public string DisplayName { get; set; }

        public string Description { get; set; }
    }
}