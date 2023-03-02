using System.ComponentModel.DataAnnotations;

namespace ATCD.DataAccess.Entity
{
    internal class Genre
    {
        [Key]
        public int GenreKey { get; set; }

        public string DisplayName { get; set; }
    }
}