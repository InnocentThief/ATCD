using System.ComponentModel.DataAnnotations;

namespace ATCD.Backend.Dto.Web
{
    public sealed class LoginDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}