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

        internal void SaveSong(SongDto songDto)
        {
            var song = songDto.ToEntity();
            songRepository.SaveSong(song);
        }
    }
}