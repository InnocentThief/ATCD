using System.ComponentModel.DataAnnotations;

namespace ATCD.DataAccess.Entity
{
    internal class Account
    {
        [Key]
        public int AccountKey { get; set; }

        [MaxLength(50)]
        [Required]
        public string Username { get; set; }

        [MinLength(32)]
        [MaxLength(32)]
        [Required]
        public byte[] PasswordHash { get; set; }

        [MaxLength(32)]
        [MinLength(32)]
        [Required]
        public byte[] Salt { get; set; }

        [MaxLength(200)]
        [Required]
        public string EMail { get; set; }

        public DateTime Created { get; set; }
    }
}