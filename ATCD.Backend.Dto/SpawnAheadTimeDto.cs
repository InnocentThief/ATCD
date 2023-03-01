using System.Text.Json.Serialization;

namespace ATCD.Backend.Dto
{
    public class SpawnAheadTimeDto
    {
        [JsonPropertyName("beat")]
        public int Beat { get; set; }

        [JsonPropertyName("numerator")]
        public int Numerator { get; set; }

        [JsonPropertyName("denominator")]
        public int Denominator { get; set; }
    }
}