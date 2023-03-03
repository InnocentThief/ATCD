using System.Text.Json.Serialization;

namespace ATCD.Backend.Dto.AudioTrip
{
    public class HeaderDto
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("descriptor")]
        public string Descriptor { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("metadata")]
        public string MetaData { get; set; }

        [JsonPropertyName("spawnAheadTime")]
        public SpawnAheadTimeDto SpawnAheadTime { get; set; }

        [JsonPropertyName("gemSpeed")]
        public double GemSpeed { get; set; }

        [JsonPropertyName("gemRadius")]
        public double GemRadius { get; set; }

        [JsonPropertyName("handRadius")]
        public double HandRadius { get; set; }

        [JsonPropertyName("animClipPath")]
        public string AnimClipPath { get; set; }

        [JsonPropertyName("buildVersion")]
        public string BuildVersion { get; set; }

        [JsonPropertyName("requiredModalitites")]
        public int RequiredModalities { get; set; } // TODO: enum???

        [JsonPropertyName("choreoType")]
        public int ChoreoType { get; set; } // TODO: enum???
    }
}