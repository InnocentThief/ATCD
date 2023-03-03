using System.Text.Json.Serialization;

namespace ATCD.Backend.Dto.AudioTrip
{
    public class SubPositionDto
    {
        [JsonPropertyName("x")]
        public double X { get; set; }

        [JsonPropertyName("y")]
        public double Y { get; set; }

        [JsonPropertyName("z")]
        public double Z { get; set; }
    }
}