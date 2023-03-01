using System.Text.Json.Serialization;

namespace ATCD.Backend.Dto
{
    public class AuthorDto
    {
        [JsonPropertyName("platformID")]
        public string PlatformID { get; set; } // TODO: enum (see entity)

        [JsonPropertyName("displayName")]
        public string DisplayName { get; set; }

        [JsonPropertyName("accountID")]
        public string AccountId { get; set; }
    }
}