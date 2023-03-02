using System.Text.Json.Serialization;

namespace ATCD.Backend.Dto
{
    public class DataEventDto
    {
        [JsonPropertyName("type")]
        public int Type { get; set; }

        [JsonPropertyName("hasGuide")]
        public bool HasGuide { get; set; }

        [JsonPropertyName("time")]
        public DataEventDto Time { get; set; }

        [JsonPropertyName("beatDivision")]
        public int BeatDivision { get; set; }

        [JsonPropertyName("position")]
        public Position Position { get; set; }

        [JsonPropertyName("subPositions")]
        public List<SubPositionDto> SubPositions { get; set; }

        [JsonPropertyName("broadcastEventID")]
        public int BroadcastEventId { get; set; }
    }
}