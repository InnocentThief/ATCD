using System.Text.Json.Serialization;

namespace ATCD.Backend.Dto
{
    public class ChoreographyDto
    {
        [JsonPropertyName("header")]
        public HeaderDto Header { get; set; }

        [JsonPropertyName("data")]
        public DataDto Data { get; set; }
    }
}