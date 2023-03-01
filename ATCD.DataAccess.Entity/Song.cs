using System.ComponentModel.DataAnnotations;

namespace ATCD.DataAccess.Entity
{
    internal class Song
    {
        [Key]
        public int SongKey { get; set; }

        public bool Custom { get; set; }

        public int AuthorKey { get; set; }

        public Author Author { get; set; }

        public int SongId { get; set; }

        public string Title { get; set; }

        public string Artist { get; set; }

        public int KoreographyKey { get; set; }

        // TODO: Koreography

        public string Descriptor { get; set; }

        public string SceneName { get; set; }

        public decimal AvgBpm { get; set; }

        public string BeatDivisions { get; set; }

        public string TempoSections { get; set; }

        public string SongEventTracks { get; set; }

        public string SongURL { get; set; }

        public decimal FirstBeatTimeInSeconds { get; set; }

        public decimal SongEndTimeInSeconds { get; set; }

        public decimal SongShortStartTimeInSeconds { get; set; }

        public decimal SongShortStopTimeInSeconds { get; set; }

        public decimal LeadingSilenceSeconds { get; set; }

        public decimal SongFullLengthInSeconds { get; set; }

        public decimal SongShortLengthInSeconds { get; set; }

        public decimal SongStartFadeTime { get; set; }

        public decimal SongEndFadeTime { get; set; }

        public decimal PreviewStartInSeconds { get; set; }

        public decimal PreviewDurationInSeconds { get; set; }

        public decimal SongStartBufferInSeconds { get; set; }

        public string ChoreoJsons { get; set; }

        public string AnimClips { get; set; }

        public decimal Speed { get; set; }

        public decimal QuantizeSize { get; set; }

        public bool IncludeInArcades { get; set; }

        public int SupportedModalitySets { get; set; }

        public string DrumMedSfx { get; set; }

        public string DrumMaxSfx { get; set; }

        public int GenreKey { get; set; }

        public string Description { get; set; }

        public bool Explicit { get; set; }

        public bool Challenge { get; set; }

        public bool ContentStrike { get; set; }

        public ICollection<Choreography> Choreographies { get; set; }
    }
}