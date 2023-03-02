using System.Text.Json.Serialization;

namespace ATCD.Backend.Dto
{
    public class MetadataDto
    {
        [JsonPropertyName("custom")]
        public bool Custom { get; set; }

        [JsonPropertyName("authorID")]
        public AuthorDto Author { get; set; }

        [JsonPropertyName("songID")]
        public string SongId { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonPropertyName("artist")]
        public string Artist { get; set; }

        [JsonPropertyName("koreography")]
        public KoreographyDto Koreography { get; set; }

        [JsonPropertyName("descriptor")]
        public string Descriptor { get; set; }

        [JsonPropertyName("sceneName")]
        public string SceneName { get; set; } // TODO: enum??

        [JsonPropertyName("avgBPM")]
        public double AvgBpm { get; set; }

        [JsonPropertyName("beatDevisions")]
        public List<int> BeatDevisions { get; set; }

        [JsonPropertyName("tempoSections")]
        public List<TempoSectionDto> TempoSections { get; set; }

        [JsonPropertyName("songEventTracks")]
        public List<SongEventTrackDto> SongEventTracks { get; set; }

        [JsonPropertyName("songFilename")]
        public string SongFilename { get; set; }

        [JsonPropertyName("firstBeatTimeInSeconds")]
        public double FirstBeatTimeInSeconds { get; set; }

        [JsonPropertyName("songEndTimeInSeconds")]
        public double SongEndTimeInSeconds { get; set; }

        [JsonPropertyName("songShortStartTimeInSeconds")]
        public double SongShortStartTimeInSeconds { get; set; }

        [JsonPropertyName("songShortStopTimeInSeconds")]
        public double SongShortStopTimeInSeconds { get; set; }

        [JsonPropertyName("leadingSilenceSeconds")]
        public double LeadingSilenceSeconds { get; set; }

        [JsonPropertyName("songFullLengthInSeconds")]
        public double SongFullLengthInSeconds { get; set; }

        [JsonPropertyName("songShortLengthInSeconds")]
        public double SongShortLengthInSeconds { get; set; }

        [JsonPropertyName("songStartFadeTime")]
        public double SongStartFadeTime { get; set; }

        [JsonPropertyName("songEndFadeTime")]
        public double SongEndFadeTime { get; set; }

        [JsonPropertyName("previewStartInSeconds")]
        public double PreviewStartInSeconds { get; set; }

        [JsonPropertyName("previewDurationInSeconds")]
        public double previewDurationInSeconds { get; set; }

        [JsonPropertyName("songStartBufferInSeconds")]
        public double SongStartBufferInSeconds { get; set; }

        [JsonPropertyName("choreoJSONs")]
        public List<ChoreoJsonDto> ChoreoJsons { get; set; }

        [JsonPropertyName("animClips")]
        public List<AnimClipDto> AnimClips { get; set; }

        [JsonPropertyName("speed")]
        public double Speed { get; set; }

        [JsonPropertyName("quantizeSize")]
        public double QuantizeSize { get; set; }

        [JsonPropertyName("includeInArcades")]
        public bool IncludeInArcades { get; set; }

        [JsonPropertyName("supportedModalitySets")]
        public int SupportedModalitySets { get; set; }

        [JsonPropertyName("drumMedSFX")]
        public string DrumMedSfx { get; set; }

        [JsonPropertyName("drumMaxSFX")]
        public string DrumMaxSfx { get; set; }
    }
}