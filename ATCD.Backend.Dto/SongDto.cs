using System.Text.Json.Serialization;

namespace ATCD.Backend.Dto
{
    public class SongDto
    {
        [JsonPropertyName("metadata")]
        public MetadataDto Metadata { get; set; }

        [JsonPropertyName("choreographies")]
        public ChoreographiesDto Choreographies { get; set; }
    }
}