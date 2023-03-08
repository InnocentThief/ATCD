using ATCD.DataAccess.Entity;
using ATCD.DataAccess.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATCD.DataAccess.Repository
{
    internal class SongRepository : RepositoryBase<SongContext>
    {
        protected internal override SongContext GetContext()
        {
            return new SongContext();
        }

        public async Task<Song> GetSongAsync(int songKey)
        {
            using var context = GetContext();
            return await context.Song
                .AsNoTracking()
                .Include(s => s.Author)
                .Include(s => s.Koreography)
                .Include(s => s.TempoSections)
                .Include(s => s.SongEventTracks).ThenInclude(set => set.TrackEvents)
                .Include(s => s.Choreographies).ThenInclude(c => c.ChoreographyDatas)
                .SingleOrDefaultAsync(s => s.SongKey == songKey);
        }

        public void SaveSong(Song song)
        {
            Save(song, c => c.Song, s => s.SongKey == song.SongKey);
        }
    }
}