using ATCD.DataAccess.Entity;
using Microsoft.EntityFrameworkCore;

namespace ATCD.DataAccess.Model
{
    internal sealed class SongContext : ContextBase
    {
        public DbSet<Genre> Genre { get; set; }

        public DbSet<Koreography> Koreography { get; set; }

        public DbSet<Song> Song { get; set; }
    }
}