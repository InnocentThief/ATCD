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
                .Include(a => a.Songs)
                .OrderBy(a => a.DisplayName)
                .ToListAsync();
        }

        public async Task<Author> GetAuthorForOverviewAsync(int authorKey)
        {
            using var context = GetContext();
            return await context.Author
                .AsNoTracking()
                .Include(a => a.Songs)
                .SingleOrDefaultAsync(a => a.AuthorKey == authorKey);
        }

        public async Task<List<Author>> GetAuthorsForAccountAsync(int accountKey)
        {
            using var context = GetContext();
            return await context.Author
                .AsNoTracking()
                .Include(a => a.Songs)
                .Where(a => a.AccountKey == accountKey)
                .ToListAsync();
        }

        public async Task<List<Song>> GetPublishedSongsAsync(int accountKey)
        {
            using var context = GetContext();
            return await context.Song
                .AsNoTracking()
                .Include(s => s.Author)
                .Include(s => s.Choreographies)
                .Include(s => s.Genre)
                .Where(s => s.Author.AccountKey == accountKey)
                .Where(s => s.Published)
                .OrderBy(s => s.Title)
                .ToListAsync();
        }

        public async Task<List<Song>> GetUnpublishedSongsAsync(int accountKey)
        {
            using var context = GetContext();
            return await context.Song
                .AsNoTracking()
                .Include(s => s.Author)
                .Include(s => s.Choreographies)
                .Include(s => s.Genre)
                .Where(s => s.Author.AccountKey == accountKey)
                .Where(s => !s.Published)
                .OrderBy(s => s.Title)
                .ToListAsync();
        }

        /// <summary>
        /// Saves the given author if it doesn't exist.
        /// </summary>
        /// <param name="author">The author to save.</param>
        public async Task<Author> SaveAuthorInitialAsync(Author author)
        {
            using var context = GetContext();
            var existingAuthor = await context.Author.SingleOrDefaultAsync(a => a.AccountId == author.AccountId);
            if (existingAuthor == null)
            {
                Save(author, c => c.Author, a => a.AuthorKey == author.AuthorKey);
                return author;
            }
            else { return existingAuthor; }
        }
    }
}