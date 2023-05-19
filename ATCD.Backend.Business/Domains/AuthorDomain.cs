using ATCD.Backend.Business.Converter.AudioTrip;
using ATCD.Backend.Business.Converter.Web;
using ATCD.Backend.Dto.AudioTrip;
using ATCD.Backend.Dto.Web;
using ATCD.DataAccess.Repository;

namespace ATCD.Backend.Business.Domains
{
    internal sealed class AuthorDomain
    {
        private readonly AuthorRepository authorRepository;

        public AuthorDomain()
        {
            authorRepository = new AuthorRepository();
        }

        internal async Task<List<AuthorOverviewDto>> GetAuthorsForOverviewAsync()
        {
            var authors = await authorRepository.GetAuthorsForOverviewAsync();
            return authors.ToOverviewDtos();
        }

        internal async Task<AuthorOverviewDto> GetAuthorForOverviewAsync(int authorKey)
        {
            var author = await authorRepository.GetAuthorForOverviewAsync(authorKey);
            return author.ToOverviewDto();
        }

        internal async Task<List<AuthorOverviewDto>> GetAuthorsForAccountAsync(int accountKey)
        {
            var authors = await authorRepository.GetAuthorsForAccountAsync(accountKey);
            return authors.ToOverviewDtos();
        }

        internal async Task<List<SongOverviewDto>> GetPublishedSongsAsync(int accountKey)
        {
            var songs = await authorRepository.GetPublishedSongsAsync(accountKey);
            return songs.ToOverviewDtos();
        }

        internal async Task<List<SongOverviewDto>> GetUnpublishedSongsAsync(int accountKey)
        {
            var songs = await authorRepository.GetUnpublishedSongsAsync(accountKey);
            return songs.ToOverviewDtos();
        }
    }
}