using System.Text.Json.Serialization;

namespace ATCD.Backend.Dto.AudioTrip
{
    public class TempoSectionDto
    {
        [JsonPropertyName("startTimeInSeconds")]
        public double StartTimeInSeconds { get; set; }

        [JsonPropertyName("beatsPerMeasure")]
        public int BeatsPerMeasure { get; set; }

        [JsonPropertyName("beatsPerMinute")]
        public double BeatsPerMinute { get; set; }

        [JsonPropertyName("doesStartNewMeasure")]
        public bool DoesStartNewMeasure { get; set; }   
    }
}