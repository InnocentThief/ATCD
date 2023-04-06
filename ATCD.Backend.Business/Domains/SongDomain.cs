using ATCD.Backend.Business.Converter.Web;
using ATCD.Backend.Dto.Web;
using ATCD.DataAccess.Repository;

namespace ATCD.Backend.Business.Domains
{
    internal sealed class SongDomain
    {
        private readonly SongRepository songRepository;

        public SongDomain()
        {
            songRepository = new SongRepository();
        }

        internal async Task<List<SongOverviewDto>> GetSongsForOverviewAsync(string title = "", string artist = "", string author = "")
        {
            var songs = await songRepository.GetSongsForOverviewAsync(title, artist, author);
            return songs.ToOverviewDtos();
        }

        internal async Task<SongOverviewDto> GetSongForOverviewAsync(int songKey)
        {
            var song = await songRepository.GetSongForOverviewAsync(songKey);
            return song.ToOverviewDto();
        }

        internal async Task<List<SongOverviewDto>> GetLatestSongsByAuthorAsync(int authorKey)
        {
            var songs = await songRepository.GetLatestSongsByAuthorAsync(authorKey);
            return songs.ToOverviewDtos();
        }

        internal async Task<List<SongOverviewDto>> GetLatestSongsByGenreAsync(int genreKey)
        {
            var songs = await songRepository.GetLatestSongsByGenreAsync(genreKey);
            return songs.ToOverviewDtos();
        }
    }
}