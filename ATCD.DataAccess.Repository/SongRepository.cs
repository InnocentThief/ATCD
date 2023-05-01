using ATCD.DataAccess.Entity;
using ATCD.DataAccess.Model;
using Microsoft.EntityFrameworkCore;

namespace ATCD.DataAccess.Repository
{
    internal sealed class SongRepository : RepositoryBase<SongContext>
    {
        protected internal override SongContext GetContext()
        {
            return new SongContext();
        }

        public async Task<List<Song>> GetSongsForOverviewAsync(string searchText)
        {
            using var context = GetContext();
            var query = context.Song
                .AsNoTracking()
                .Include(s => s.Author)
                .Include(s => s.Choreographies)
                .Include(s => s.Genre)
                .Where(s => s.Custom == true);

            if (!string.IsNullOrWhiteSpace(searchText))
            {
                query = query
                    .Where(s => s.Title.Contains(searchText) || s.Artist.Contains(searchText) || s.Author.DisplayName.Contains(searchText));
            }

            return await query.Take(50).ToListAsync();
        }

        public async Task<Song> GetSongForOverviewAsync(int songKey)
        {
            using var context = GetContext();
            return await context.Song
                .AsNoTracking()
                .Include(s => s.Author)
                .Include(s => s.Choreographies)
                .Include(s => s.Genre)
                .SingleOrDefaultAsync(s => s.SongKey == songKey);
        }

        public async Task<List<Song>> GetLatestSongsByAuthorAsync(int authorKey)
        {
            using var context = GetContext();
            return await context.Song
                .AsNoTracking()
                .Include(s => s.Author)
                .Include(s => s.Choreographies)
                .Include(s => s.Genre)
                .Where(s => s.AuthorKey == authorKey)
                .OrderByDescending(s => s.Released)
                .Take(10)
                .ToListAsync();
        }

        public async Task<List<Song>> GetLatestSongsByGenreAsync(int genreKey)
        {
            using var context = GetContext();
            return await context.Song
                .AsNoTracking()
                .Include(s => s.Author)
                .Include(s => s.Choreographies)
                .Include(s => s.Genre)
                .Where(s => s.GenreKey == genreKey)
                .OrderByDescending(s => s.Released)
                .Take(10)
                .ToListAsync();
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

        public void SaveSongBySongId(Song song)
        {
            Save(song, c => c.Song, s => s.SongId == song.SongId);
        }

        public void SaveKoregraphy(Koreography koreography)
        {
            Save(koreography, c => c.Koreography, k => k.KoreographyKey == koreography.KoreographyKey);
        }
    }
}