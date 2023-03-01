using ATCD.DataAccess.Entity;
using Microsoft.EntityFrameworkCore;

namespace ATCD.DataAccess.Model
{
    internal class SongContext: ContextBase
    {
        public DbSet<Author> Authors { get; set; }

        public DbSet<Song> Song { get; set; }
    }
}