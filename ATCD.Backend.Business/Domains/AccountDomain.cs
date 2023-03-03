using ATCD.Backend.Business.Security;
using ATCD.Backend.Dto.Web;
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

        internal async Task<LoginDto> LoginAsync(string username, string password)
        {
            if (string.IsNullOrWhiteSpace(username)) throw new ArgumentNullException(nameof(username));
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentNullException(nameof(password));

            var account = await accountRepository.GetAccountAsync(username);

            var credentials = new SecurityCredentials(account.PasswordHash, account.Salt);
            var passwordVerified = PasswordSecurity.VerifyPassword(credentials, password);
            if (passwordVerified)
            {
                return new LoginDto { Username = username, AccountKey = account.AccountKey };
            }
            return null;
        }
    }
}