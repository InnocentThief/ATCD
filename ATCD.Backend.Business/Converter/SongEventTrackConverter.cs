using ATCD.Backend.Dto.AudioTrip;
using ATCD.DataAccess.Entity;

namespace ATCD.Backend.Business.Converter
{
    internal static class SongEventTrackConverter
    {
        internal static SongEventTrack ToEntity(this SongEventTrackDto songEventTrackDto)
        {
            return new SongEventTrack
            {
                EventId = songEventTrackDto.EventId,
                TrackEvents = songEventTrackDto.Events.ToEntities(),
            };
        }

        internal static List<SongEventTrack> ToEntities(this List<SongEventTrackDto> songEventTrackDtos)
        {
            if (songEventTrackDtos == null) { throw new ArgumentNullException(nameof(songEventTrackDtos)); }
            return songEventTrackDtos.Select(ToEntity).ToList();
        }
    }
}