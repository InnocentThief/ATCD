using System.Text.Json.Serialization;

namespace ATCD.Backend.Dto.AudioTrip
{
    public class DataDto
    {
        [JsonPropertyName("events")]
        public List<DataEventDto> Events { get; set; }
    }
}