using ATCD.DataAccess.Model;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace ATCD.DataAccess.Repository
{
    internal abstract class RepositoryBase<TContext> where TContext : ContextBase
    {
        /// <summary>
        /// Creates the corresponding context.
        /// </summary>
        /// <returns>The corresponding context.</returns>
        protected internal abstract TContext GetContext();

        /// <summary>
        /// Attaches the given items to the database.
        /// </summary>
        /// <typeparam name="TEntity">The type of the entities to attach.</typeparam>
        /// <param name="items">The items to attach.</param>
        /// <exception cref="ArgumentNullException">Thrown if <paramref name="items"/> is null.</exception>
        protected internal void AttachAll<TEntity>(IEnumerable<TEntity> items) where TEntity : class
        {
            if (items == null)
                throw new ArgumentNullException(nameof(items));

            TContext? context = null;
            try
            {
                context = GetContext();
                context.ChangeTracker.AutoDetectChangesEnabled = false;
                int count = 0;
                foreach (var item in items)
                {
                    ++count;
                    context = AddToContext(context, item, count, 100);
                }
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception($"Unable to attach entities of type {typeof(TEntity)}", ex);
            }
            finally
            {
                context?.Dispose();
            }
        }

        /// <summary>
        /// Deletes a single entity.
        /// </summary>
        /// <typeparam name="TEntity">The type of the entity to be deleted.</typeparam>
        /// <param name="dbCollection">Represents the data table where the entity will be deleted / removed from.</param>
        /// <param name="primaryKeySelector">A predicate to locate the unique identifier of the existing entity.</param>
        protected internal void Delete<TEntity>(Func<TContext, DbSet<TEntity>> dbCollection, Expression<Func<TEntity, bool>> primaryKeySelector) where TEntity : class
        {
            try
            {
                using var context = GetContext();
                var original = dbCollection(context).SingleOrDefault(primaryKeySelector);
                if (original != null)
                {
                    context.Entry(original).State = EntityState.Deleted;
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Unable to delete entity of type {typeof(TEntity)}", ex);
            }
        }

        /// <summary>
        /// Deletes all entities that satisfy the predicate.
        /// </summary>
        /// <typeparam name="TEntity">The type of the entity to be deleted.</typeparam>
        /// <param name="dbCollection">Represents the data table where the entities will be deleted / removed from.</param>
        /// <param name="predicate">A predicate to locate the existring entities.</param>
        protected internal void DeleteAll<TEntity>(Func<TContext, DbSet<TEntity>> dbCollection, Expression<Func<TEntity, bool>> predicate) where TEntity : class
        {
            try
            {
                using var context = GetContext();
                var originals = dbCollection(context).Where(predicate);
                if (originals.Any())
                {
                    foreach (var original in originals)
                    {
                        context.Entry(original).State = EntityState.Deleted;
                    }
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Unable to delete entities of type {typeof(TEntity)}", ex);
            }
        }

        /// <summary>
        /// Saves a given entity to the database.
        /// </summary>
        /// <typeparam name="TEntity">The type of the entity to be saved.</typeparam>
        /// <param name="item">The entity to be saved.</param>
        /// <param name="dbCollection">Represents the data table where the entity will be stored.</param>
        /// <param name="predicate">A predicate to locate an existring entity.</param>
        protected internal void Save<TEntity>(TEntity item, Func<TContext, DbSet<TEntity>> dbCollection, Expression<Func<TEntity, bool>> predicate) where TEntity : class
        {
            try
            {
                using var context = GetContext();
                var original = dbCollection(context).SingleOrDefault(predicate);
                if (original == null)
                {
                    dbCollection(context).Attach(item);
                    context.Entry(item).State = EntityState.Added;
                }
                else
                {
                    context.Entry(original).CurrentValues.SetValues(item);
                }
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception($"Unable to save entity of type {typeof(TEntity)}", ex);
            }
        }

        private TContext AddToContext<TEntity>(TContext context, TEntity entity, int count, int commitCount) where TEntity : class
        {
            context.Set<TEntity>().Add(entity);
            if (count % commitCount == 0)
            {
                context.SaveChanges();
                context.Dispose();
                context = GetContext();
                context.ChangeTracker.AutoDetectChangesEnabled = false;
            }
            return context;
        }
    }
}