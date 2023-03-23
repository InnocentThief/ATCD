using ATCD.DataAccess.Entity;
using ATCD.DataAccess.Model;
using Microsoft.EntityFrameworkCore;

namespace ATCD.DataAccess.Repository
{
    internal sealed class AuthorRepository : RepositoryBase<AuthorContext>
    {
        protected internal override AuthorContext GetContext()
        {
            return new AuthorContext();
        }

        public async Task<List<Author>> GetAuthorsForOverviewAsync()
        {
            using var context = GetContext();
            return await context.Author
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Author> GetAuthorForOverviewAsync(int authorKey)
        {
            using var context = GetContext();
            return await context.Author
                .AsNoTracking()
                .SingleOrDefaultAsync(a => a.AuthorKey == authorKey);
        }
    }
}