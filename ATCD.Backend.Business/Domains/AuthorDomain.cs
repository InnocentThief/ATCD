using ATCD.Backend.Business.Converter.Web;
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
    }
}