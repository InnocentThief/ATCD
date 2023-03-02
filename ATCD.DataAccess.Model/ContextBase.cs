﻿using ATCD.DataAccess.Entity;
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
            modelBuilder.Entity<Choreography>().HasMany(c => c.Data).WithOne().HasForeignKey(cd => cd.ChoreographyKey);
            modelBuilder.Entity<Song>().HasOne(s => s.Author).WithMany().HasForeignKey(s => s.AuthorKey);
            modelBuilder.Entity<Song>().HasMany(s => s.Choreographies).WithOne().HasForeignKey(c => c.SongKey);
            modelBuilder.Entity<Song>().HasOne(s => s.Koreography).WithOne().HasForeignKey<Song>(s => s.KoreographyKey);
            modelBuilder.Entity<Song>().HasMany(s => s.SongEventTracks).WithOne().HasForeignKey(set => set.SongKey);
            modelBuilder.Entity<SongEventTrack>().HasMany(set => set.TrackEvents).WithOne().HasForeignKey(te => te.SongEventTrackKey);
        }
    }
}