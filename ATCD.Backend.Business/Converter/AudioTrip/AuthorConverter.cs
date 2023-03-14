using ATCD.Backend.Dto.AudioTrip;
using ATCD.DataAccess.Entity;

namespace ATCD.Backend.Business.Converter.AudioTrip
{
    internal static class AuthorConverter
    {
        internal static Author ToEntity(this AuthorDto authorDto)
        {
            return new Author
            {
                AccountId = authorDto.AccountId,
                DisplayName = authorDto.DisplayName,
                PlatformId = authorDto.PlatformId
            };
        }

        internal static AuthorDto ToDto(this Author author)
        {
            return new AuthorDto
            {
                AccountId = author.AccountId,
                DisplayName = author.DisplayName,
                PlatformId = author.PlatformId
            };
        }
    }
}