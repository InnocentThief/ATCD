using System.Text.Json.Serialization;

namespace ATCD.Backend.Dto
{
    public class TrackEventDto
    {
        [JsonPropertyName("startTimeInSeconds")]
        public double StartTimeInSeconds { get; set; }

        [JsonPropertyName("endTimeInSeconds")]
        public double EndTimeInSeconds { get; set; }

        [JsonPropertyName("payloadType")]
        public int PayloadType { get; set; }

        [JsonPropertyName("payload")]
        public string Payload { get; set; }
    }
}