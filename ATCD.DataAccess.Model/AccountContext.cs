using ATCD.DataAccess.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATCD.DataAccess.Model
{
    internal class AccountContext : ContextBase
    {
        public DbSet<Account> Account { get; set; }
    }
}
