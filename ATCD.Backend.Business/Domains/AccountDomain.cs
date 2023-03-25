using ATCD.Backend.Business.Converter;
using ATCD.Backend.Business.Converter.Web;
using ATCD.Backend.Business.Security;
using ATCD.Backend.Dto.Web;
using ATCD.DataAccess.Entity;
using ATCD.DataAccess.Repository;

namespace ATCD.Backend.Business.Domains
{
    internal sealed class AccountDomain
    {
        private readonly AccountRepository accountRepository;

        internal AccountDomain()
        {
            accountRepository = new AccountRepository();
        }

        public async Task<AccountDto> GetAccountAsync(int accountKey)
        {
            var account = await accountRepository.GetAccountAsync(accountKey);
            if (account != null)
            {
                return account.ToDto();
            }
            return null;
        }

        public async Task<AccountDto> CreateOrUpdateAccountAsync(AccountDto accountDto)
        {
            var account = await accountRepository.GetAccountAsync(accountDto.Username);
            //if (account == null)
            //{
            //    var credentials = PasswordSecurity.CreateSecurityCredentials(accountDto.Password);
            //    account = new Account
            //    {
            //        Created = DateTime.Now,
            //        EMail = accountDto.EMail,
            //        PasswordHash = credentials.PasswordHash,
            //        Salt = credentials.SaltValue,
            //        Username = accountDto.Username,
            //    };
            //}
            //else
            //{
            //    account.EMail = accountDto.EMail;
            //    account.Username = accountDto.Username;
            //}
            //accountRepository.SaveAccount(account);
            //return account.ToLoginDto() ?? accountDto;
            return null;
        }

        public async Task ChangePassword(LoginDto loginDto)
        {
            await Task.CompletedTask
        }
    }
}