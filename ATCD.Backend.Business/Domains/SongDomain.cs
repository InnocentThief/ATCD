using ATCD.Backend.Business.Converter;
using ATCD.Backend.Dto.AudioTrip;
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