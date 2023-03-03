using ATCD.DataAccess.Entity;
using ATCD.DataAccess.Model;
using Microsoft.EntityFrameworkCore;

namespace ATCD.DataAccess.Repository
{
    internal class AccountRepository : RepositoryBase<AccountContext>
    {
        protected internal override AccountContext GetContext()
        {
            return new AccountContext();
        }

        public async Task<Account> GetAccountAsync(string username)
        {
            using var context = GetContext();
            return await context.Account
                .SingleOrDefaultAsync(a => a.Username == username);
        }

        public async Task<Account> GetAccountAsync(int accountKey)
        {
            using var context = GetContext();
            return await context.Account
                .SingleOrDefaultAsync(a => a.AccountKey == accountKey);
        }

        public void SaveAccount(Account account)
        {
            Save(account, c => c.Account, a => a.AccountKey == account.AccountKey);
        }
    }
}