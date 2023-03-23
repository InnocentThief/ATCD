﻿using ATCD.DataAccess.Entity;
using Microsoft.EntityFrameworkCore;

namespace ATCD.DataAccess.Model
{
    internal sealed class SongContext: ContextBase
    {
        public DbSet<Song> Song { get; set; }
    }
}