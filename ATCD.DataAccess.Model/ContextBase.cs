using Microsoft.EntityFrameworkCore;
using System.Configuration;

namespace ATCD.DataAccess.Model
{
    internal abstract class ContextBase : DbContext
    {
        protected override sealed void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            var connectionString = ConfigurationManager.ConnectionStrings["ATCEntities"]?.ConnectionString;
            if (string.IsNullOrWhiteSpace(connectionString))
                throw new ConfigurationErrorsException();

            optionsBuilder.UseSqlServer(connectionString);
        }

        protected override sealed void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            if (modelBuilder == null)
                throw new ArgumentNullException(nameof(modelBuilder));

            CreateRelationshipDefinitions(modelBuilder);
        }

        protected virtual void CreateRelationshipDefinitions(ModelBuilder modelBuilder)
        {

        }
    }
}