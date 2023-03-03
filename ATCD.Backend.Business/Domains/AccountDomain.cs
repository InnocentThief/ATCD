using ATCD.Backend.Business.Converter;
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

        public async Task<LoginDto> GetAccountAsync(int accountKey)
        {
            var account = await accountRepository.GetAccountAsync(accountKey);
            if (account != null)
            {
                return account.ToLoginDto();
            }
            return null;
        }

        public async Task<LoginDto> CreateOrUpdateAccountAsync(LoginDto loginDto)
        {
            var account = await accountRepository.GetAccountAsync(loginDto.Username);
            if (account == null)
            {
                var credentials = PasswordSecurity.CreateSecurityCredentials(loginDto.Password);
                account = new Account
                {
                    Created = DateTime.Now,
                    EMail = loginDto.EMail,
                    PasswordHash = credentials.PasswordHash,
                    Salt = credentials.SaltValue,
                    Username = loginDto.Username,
                };
            }
            else
            {
                account.EMail = loginDto.EMail;
                account.Username = loginDto.Username;
            }
            accountRepository.SaveAccount(account);
            return account.ToLoginDto() ?? loginDto;
        }
    }
}