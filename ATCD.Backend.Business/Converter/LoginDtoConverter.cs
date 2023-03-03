using ATCD.Backend.Dto.Web;
using ATCD.DataAccess.Entity;

namespace ATCD.Backend.Business.Converter
{
    internal static class LoginDtoConverter
    {
        internal static LoginDto ToLoginDto(this Account account)
        {
            return new LoginDto
            {
                AccountKey = account.AccountKey,
                Created = account.Created,
                EMail = account.EMail,
                Username = account.Username
            };
        }
    }
}