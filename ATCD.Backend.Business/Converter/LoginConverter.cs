using ATCD.Backend.Dto.Web;
using ATCD.DataAccess.Entity;
using System.Runtime.CompilerServices;

namespace ATCD.Backend.Business.Converter
{
    internal static class LoginConverter
    {
        internal static ToDto(this Account account)
        {
            return new AccountDto
            {
                AccountKey = account.AccountKey,
                EMail = account.EMail,
                Username= account.Username
            };
        }

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