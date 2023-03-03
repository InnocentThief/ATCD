using System.Text.Json.Serialization;

namespace ATCD.Backend.Dto.AudioTrip
{
    public class DataEventTimeDto
    {
        [JsonPropertyName("beat")]
        public int Beat { get; set; }

        [JsonPropertyName("numerator")]
        public int Numerator { get; set; }

        [JsonPropertyName   ("denominator")]
        public int Denominator { get; set; }
    }
}