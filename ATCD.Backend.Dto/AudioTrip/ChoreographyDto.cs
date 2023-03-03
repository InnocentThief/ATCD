using System.Text.Json.Serialization;

namespace ATCD.Backend.Dto.AudioTrip
{
    public class ChoreographyDto
    {
        [JsonPropertyName("header")]
        public HeaderDto Header { get; set; }

        [JsonPropertyName("data")]
        public DataDto Data { get; set; }
    }
}