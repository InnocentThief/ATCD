using ATCD.DataAccess.Entity;
using Microsoft.EntityFrameworkCore;

namespace ATCD.DataAccess.Model
{
    internal class SongContext: ContextBase
    {
        public DbSet<Author> Author { get; set; }

        public DbSet<Genre> Genre { get; set; }

        public DbSet<Song> Song { get; set; }
    }
}