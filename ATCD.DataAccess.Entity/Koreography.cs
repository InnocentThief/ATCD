using System.ComponentModel.DataAnnotations;

namespace ATCD.DataAccess.Entity
{
    internal class Koreography
    {
        [Key]
        public int KoreographyKey { get; set; }

        public int FileId { get; set; }

        public int PathId { get; set; }
    }
}