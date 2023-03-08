using System.ComponentModel.DataAnnotations;

namespace ATCD.DataAccess.Entity
{
    internal class Author
    {
        [Key]
        public int AuthorKey { get; set; }

        public int? AccountKey { get; set; }

        //public Account Account { get; set; }

        public string PlatformId { get; set; } // TODO: enum?? OC = Ocolus Quest ST = Steam

        public string DisplayName { get; set; } // TODO: length

        public string AccountId { get; set; } // TODO: lenght
    }
}