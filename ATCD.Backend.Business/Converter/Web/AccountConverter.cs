using ATCD.Backend.Dto.Web;
using ATCD.DataAccess.Entity;

namespace ATCD.Backend.Business.Converter.Web
{
    internal static class AccountConverter
    {
        internal static AccountDto ToDto(this Account account)
        {
            return new AccountDto
            {
                AccountKey = account.AccountKey,
                Username = account.Username,
                EMail = account.EMail,
            };
        }
    }
}