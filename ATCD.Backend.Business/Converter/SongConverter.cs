using ATCD.Backend.Dto.AudioTrip;
using ATCD.DataAccess.Entity;

namespace ATCD.Backend.Business.Converter
{
    internal static class SongConverter
    {
        internal static Song ToEntity(this SongDto songDto)
        {
            return new Song
            {
                Custom = songDto.Metadata.Custom,
                Author = songDto.Metadata.Author.ToEntity(),
                SongId = songDto.Metadata.SongId,
                Title = songDto.Metadata.Title,
                Artist = songDto.Metadata.Artist,
                Koreography = songDto.Metadata.Koreography.ToEntity(),
                Descriptor = songDto.Metadata.Descriptor,
                SceneName = songDto.Metadata.SceneName,
                AvgBpm = songDto.Metadata.AvgBpm,
                TempoSections = songDto.Metadata.TempoSections.ToEntities(),
                SongEventTracks = songDto.Metadata.SongEventTracks.ToEntities(),
                SongURL = string.Empty,
                FirstBeatTimeInSeconds = songDto.Metadata.FirstBeatTimeInSeconds,
                SongEndTimeInSeconds = songDto.Metadata.SongEndTimeInSeconds,
                SongShortStartTimeInSeconds = songDto.Metadata.SongShortStartTimeInSeconds,
                SongShortStopTimeInSeconds = songDto.Metadata.SongShortStopTimeInSeconds,
                LeadingSilenceSeconds = songDto.Metadata.LeadingSilenceSeconds,
                SongFullLengthInSeconds = songDto.Metadata.SongFullLengthInSeconds,
                SongShortLengthInSeconds = songDto.Metadata.SongShortLengthInSeconds,
                SongStartFadeTime = songDto.Metadata.SongStartFadeTime,
                SongEndFadeTime = songDto.Metadata.SongEndFadeTime,
                PreviewStartInSeconds = songDto.Metadata.PreviewStartInSeconds,
                PreviewDurationInSeconds = songDto.Metadata.PreviewDurationInSeconds,
                ChoreoJsons = string.Empty,
                AnimClips = string.Empty,
                Speed = songDto.Metadata.Speed,
                QuantizeSize = songDto.Metadata.QuantizeSize,
                IncludeInArcades = songDto.Metadata.IncludeInArcades,
                SupportedModalitySets = songDto.Metadata.SupportedModalitySets,
                DrumMaxSfx = songDto.Metadata.DrumMaxSfx,
                DrumMedSfx = songDto.Metadata.DrumMedSfx,
                Description = string.Empty,
                GenreKey = null,
                Explicit = false,
                Challenge = false,
                ContentStrike = false,
                Released = DateTime.Now,
                Choreographies = songDto.Choreographies.Choreographies.ToEntities()
            };
        }
    }
}