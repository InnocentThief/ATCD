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
            var account = await context.Account
                .SingleOrDefaultAsync(a => a.Username == username);
            return account ?? throw new Exception("Unkown user");
        }
    }
}