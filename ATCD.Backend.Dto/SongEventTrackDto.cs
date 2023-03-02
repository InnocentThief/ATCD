using System.Text.Json.Serialization;

namespace ATCD.Backend.Dto
{
    public class SongEventTrackDto
    {
        [JsonPropertyName("eventID")]
        public string EventId { get; set; }

        [JsonPropertyName("events")]
        public List<TrackEventDto> Events { get; set; }
    }
}