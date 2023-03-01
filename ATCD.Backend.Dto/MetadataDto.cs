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
        public decimal AvgBpm { get; set; }

        [JsonPropertyName("beatDevisions")]
        public List<int> BeatDevisions { get; set; }

        [JsonPropertyName("tempoSections")]
        public string TempoSections { get; set; }

        [JsonPropertyName("songEventTracks")]
        public string SongEventTracks { get; set; }

        [JsonPropertyName("songFilename")]
        public string SongFilename { get; set; }

        [JsonPropertyName("firstBeatTimeInSeconds")]
        public decimal FirstBeatTimeInSeconds { get; set; }

        [JsonPropertyName("songEndTimeInSeconds")]
        public decimal SongEndTimeInSeconds { get; set; }

        [JsonPropertyName("songShortStartTimeInSeconds")]
        public decimal SongShortStartTimeInSeconds { get; set; }

        [JsonPropertyName("songShortStopTimeInSeconds")]
        public decimal SongShortStopTimeInSeconds { get; set; }

        [JsonPropertyName("leadingSilenceSeconds")]
        public decimal LeadingSilenceSeconds { get; set; }

        [JsonPropertyName("songFullLengthInSeconds")]
        public decimal SongFullLengthInSeconds { get; set; }

        [JsonPropertyName("songShortLengthInSeconds")]
        public decimal SongShortLengthInSeconds { get; set; }

        [JsonPropertyName("songStartFadeTime")]
        public decimal SongStartFadeTime { get; set; }

        [JsonPropertyName("songEndFadeTime")]
        public decimal SongEndFadeTime { get; set; }

        [JsonPropertyName("previewStartInSeconds")]
        public decimal PreviewStartInSeconds { get; set; }

        [JsonPropertyName("previewDurationInSeconds")]
        public decimal previewDurationInSeconds { get; set; }

        [JsonPropertyName("songStartBufferInSeconds")]
        public decimal SongStartBufferInSeconds { get; set; }

        [JsonPropertyName("choreoJSONs")]
        public List<ChoreoJsonDto> ChoreoJsons { get; set; }

        [JsonPropertyName("animClips")]
        public List<AnimClipDto> AnimClips { get; set; }

        [JsonPropertyName("speed")]
        public decimal Speed { get; set; }

        [JsonPropertyName("quantizeSize")]
        public decimal QuantizeSize { get; set; }

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