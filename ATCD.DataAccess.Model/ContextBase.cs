﻿using ATCD.DataAccess.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.Extensions.Configuration;
using System.Configuration;

namespace ATCD.DataAccess.Model
{
    internal abstract class ContextBase : DbContext
    {
        protected override sealed void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            var config = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            var connectionString = config.GetConnectionString("DefaultConnection");
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
            CreateDefaultValues(modelBuilder);
        }

        protected virtual void CreateRelationshipDefinitions(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Account>().HasMany(acc => acc.Authors).WithOne().HasForeignKey(a => a.AccountKey);
            modelBuilder.Entity<Choreography>().HasMany(c => c.ChoreographyDatas).WithOne().HasForeignKey(cd => cd.ChoreographyKey);
            modelBuilder.Entity<Song>().HasOne(s => s.Author).WithMany(a => a.Songs).HasForeignKey(s => s.AuthorKey);
            modelBuilder.Entity<Song>().HasMany(s => s.Choreographies).WithOne().HasForeignKey(c => c.SongKey);
            modelBuilder.Entity<Song>().HasOne(s => s.Genre).WithMany().HasForeignKey(s => s.GenreKey);
            modelBuilder.Entity<Song>().HasOne(s => s.Koreography).WithOne().HasForeignKey<Song>(s => s.KoreographyKey);
            modelBuilder.Entity<Song>().HasMany(s => s.SongEventTracks).WithOne().HasForeignKey(set => set.SongKey);
            modelBuilder.Entity<Song>().HasMany(s => s.TempoSections).WithOne().HasForeignKey(ts => ts.SongKey);
            modelBuilder.Entity<SongEventTrack>().HasMany(set => set.TrackEvents).WithOne().HasForeignKey(te => te.SongEventTrackKey);
        }

        protected virtual void CreateDefaultValues(ModelBuilder modelBuilder)
        {
            CreateSongDefaultValues(modelBuilder.Entity<Song>());
        }

        #region

        private void CreateSongDefaultValues(EntityTypeBuilder<Song> entity)
        {
            entity.Property(s => s.SongURL).HasDefaultValue(string.Empty);
            entity.Property(s => s.CoverURL).HasDefaultValue(string.Empty);
            entity.Property(s => s.GenreKey).HasDefaultValue(1);
            entity.Property(s => s.Description).HasDefaultValue(string.Empty);
            entity.Property(s => s.DrumMedSfx).HasDefaultValue(string.Empty);
            entity.Property(s => s.DrumMaxSfx).HasDefaultValue(string.Empty);
            entity.Property(s => s.Explicit).HasDefaultValue(false);
            entity.Property(s => s.Challenge).HasDefaultValue(false);
            entity.Property(s => s.ContentStrike).HasDefaultValue(false);
        }

        #endregion
    }
}