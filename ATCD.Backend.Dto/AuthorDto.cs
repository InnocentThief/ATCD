using System.Text.Json.Serialization;

namespace ATCD.Backend.Dto
{
    public class AuthorDto
    {
        [JsonPropertyName("platformID")]
        public string PlatformId { get; set; }

        [JsonPropertyName("displayName")]
        public string DisplayName { get; set; }

        [JsonPropertyName("accountID")]
        public string AccountId { get; set; }
    }
}