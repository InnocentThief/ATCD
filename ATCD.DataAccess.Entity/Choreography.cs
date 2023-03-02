using System.ComponentModel.DataAnnotations;

namespace ATCD.DataAccess.Entity
{
    internal class Choreography
    {
        [Key]
        public int ChoreogrphyId { get; set; }

        public int SongKey { get; set; }

        public string Id { get; set; }

        public string Descriptor { get; set; }

        public string Name { get; set; }

        public double GemSpeed { get; set; }

        public double GemRadius { get; set; }

        public double HandRadius { get; set; }

        public string AnimClipPath { get; set; }

        public string BuildVersion { get; set; }

        public int RequiredModalities { get; set; }

        public int ChoreoType { get; set; }

        public List<ChoreographyData> Data { get; set; }
    }
}