using System.Text.Json.Serialization;

namespace ATCD.Backend.Dto
{
    public class ChoreographiesDto
    {
        [JsonPropertyName("list")]
        public List<ChoreographyDto> Choreographies { get; set; }
    }
}