﻿using System.ComponentModel.DataAnnotations;

namespace ATCD.DataAccess.Entity
{
    internal class Author
    {
        [Key]
        public int AuthorKey { get; set; }

        public int? AccountKey { get; set; }

        public string PlatformId { get; set; } // TODO: enum?? OC = Ocolus Quest ST = Steam

        public string DisplayName { get; set; } // TODO: length

        public string AccountId { get; set; } // TODO: lenght

        public string Description { get; set; }

        public ICollection<Song> Songs { get; set; }
    }
}