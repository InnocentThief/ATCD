using System.Text.Json.Serialization;

namespace ATCD.Backend.Dto.AudioTrip
{
    public class ChoreographiesDto
    {
        [JsonPropertyName("list")]
        public List<ChoreographyDto> Choreographies { get; set; }
    }
}