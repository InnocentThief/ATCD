using System.ComponentModel.DataAnnotations;

namespace ATCD.Backend.Dto.Web
{
    public class AccountDto
    {
        [Required]
        public int AccountKey { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string EMail { get; set; }

        [Required]
        public DateTime Created { get; set; }
    }
}