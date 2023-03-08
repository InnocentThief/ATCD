using ATCD.DataAccess.Entity;
using ATCD.DataAccess.Model;
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

        public void SaveSong(Song song)
        {
            Save(song, c => c.Song, s => s.SongKey == song.SongKey);
        }
    }
}