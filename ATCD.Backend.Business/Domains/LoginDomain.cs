using ATCD.Backend.Business.Security;
using ATCD.Backend.Dto.Web;
using ATCD.DataAccess.Repository;

namespace ATCD.Backend.Business.Domains
{
    internal sealed class LoginDomain
    {
        private readonly AccountRepository accountRepository;

        public LoginDomain()
        {
            accountRepository = new AccountRepository();
        }

        internal async Task<AccountDto> LoginAsync(string username, string password)
        {
            if (string.IsNullOrWhiteSpace(username)) throw new ArgumentNullException(nameof(username));
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentNullException(nameof(password));

            var account = await accountRepository.GetAccountAsync(username);
            if (account != null)
            {
                var credentials = new SecurityCredentials(account.PasswordHash, account.Salt);
                var passwordVerified = PasswordSecurity.VerifyPassword(credentials, password);
                if (passwordVerified)
                {
                    return new AccountDto { Username = username, AccountKey = account.AccountKey };
                }
            }
            return null;
        }
    }
}