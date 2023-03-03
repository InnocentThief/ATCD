using System.ComponentModel.DataAnnotations;

namespace ATCD.DataAccess.Entity
{
    internal class Account
    {
        [Key]
        public int AccountId { get; set; }

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

        public ICollection<Author> Authors { get; set; }
    }
}