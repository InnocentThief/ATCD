using System.Text.Json.Serialization;

namespace ATCD.Backend.Dto
{
    public class KoreographyDto
    {
        [JsonPropertyName("m_FileID")]
        public int FileId { get; set; }

        [JsonPropertyName("m_PathID")]
        public int PathId { get; set; }
    }
}