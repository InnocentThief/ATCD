using ATCD.Backend.Business.Converter.AudioTrip;
using ATCD.Backend.Business.Converter.Web;
using ATCD.Backend.Dto.AudioTrip;
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

        internal async Task<List<SongOverviewDto>> GetSongsForOverview(string title = "", string artist = "", string author = "")
        {
            var songs = await songRepository.GetSongsForOverviewAsync(title, artist, author);
            return songs.ToOverviewDtos();
        }

        internal async Task<SongDto> SaveSongAsync(SongDto songDto)
        {
            var song = songDto.ToEntity();
            songRepository.SaveSong(song);

            var savedSong = await songRepository.GetSongAsync(song.SongKey);
            var savedSongDto = savedSong.ToDto();

            return savedSongDto;
        }
    }
}