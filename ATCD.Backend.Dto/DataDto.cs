using System.Text.Json.Serialization;

namespace ATCD.Backend.Dto
{
    public class DataDto
    {
        [JsonPropertyName("events")]
        public List<DataEventDto> Events { get; set; }
    }
}