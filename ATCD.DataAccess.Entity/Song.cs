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

        public string SongId { get; set; }

        public string Title { get; set; }

        public string Artist { get; set; }

        public int KoreographyKey { get; set; }

        public Koreography Koreography { get; set; }

        public string Descriptor { get; set; }

        public string SceneName { get; set; }

        public double AvgBpm { get; set; }

        public List<TempoSection> TempoSections { get; set; }

        public List<SongEventTrack> SongEventTracks { get; set; }

        public string SongURL { get; set; }

        public double FirstBeatTimeInSeconds { get; set; }

        public double SongEndTimeInSeconds { get; set; }

        public double SongShortStartTimeInSeconds { get; set; }

        public double SongShortStopTimeInSeconds { get; set; }

        public double LeadingSilenceSeconds { get; set; }

        public double SongFullLengthInSeconds { get; set; }

        public double SongShortLengthInSeconds { get; set; }

        public double SongStartFadeTime { get; set; }

        public double SongEndFadeTime { get; set; }

        public double PreviewStartInSeconds { get; set; }

        public double PreviewDurationInSeconds { get; set; }

        public double SongStartBufferInSeconds { get; set; }

        public string ChoreoJsons { get; set; }

        public string AnimClips { get; set; }

        public double Speed { get; set; }

        public double QuantizeSize { get; set; }

        public bool IncludeInArcades { get; set; }

        public int SupportedModalitySets { get; set; }

        public string DrumMedSfx { get; set; }

        public string DrumMaxSfx { get; set; }

        public int? GenreKey { get; set; }

        public string Description { get; set; }

        public bool Explicit { get; set; }

        public bool Challenge { get; set; }

        public bool ContentStrike { get; set; }

        public DateTime Released { get; set; }

        public ICollection<Choreography> Choreographies { get; set; }
    }
}