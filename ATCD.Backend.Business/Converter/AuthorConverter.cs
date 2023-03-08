using ATCD.Backend.Dto.AudioTrip;
using ATCD.DataAccess.Entity;

namespace ATCD.Backend.Business.Converter
{
    internal static class AuthorConverter
    {
        public static Author ToEntity(this AuthorDto authorDto)
        {
            return new Author
            {
                AccountId = authorDto.AccountId,
                DisplayName = authorDto.DisplayName,
                PlatformId = authorDto.PlatformId
            };
        }
    }
}