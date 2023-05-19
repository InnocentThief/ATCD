using ATCD.DataAccess.Entity;
using Microsoft.EntityFrameworkCore;

namespace ATCD.DataAccess.Model
{
    internal sealed class AuthorContext: ContextBase
    {
        public DbSet<Author> Author { get; set; }

        public DbSet<Song> Song { get; set; }
    }
}