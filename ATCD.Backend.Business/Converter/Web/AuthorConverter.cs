using ATCD.Backend.Dto.Web;
using ATCD.DataAccess.Entity;

namespace ATCD.Backend.Business.Converter.Web
{
    internal static class AuthorConverter
    {
        internal static AuthorOverviewDto ToOverviewDto(this Author author)
        {
            return new AuthorOverviewDto
            {
                AuthorKey = author.AuthorKey,
                DisplayName = author.DisplayName,
                AccountId = author.AccountId,
                Description = author.Description,
                PlatformId = author.PlatformId
            };
        }

        internal static List<AuthorOverviewDto> ToOverviewDtos(this List<Author> authors)
        {
            if (authors == null) throw new ArgumentNullException(nameof(authors));
            return authors.Select(ToOverviewDto).ToList();
        }
    }
}