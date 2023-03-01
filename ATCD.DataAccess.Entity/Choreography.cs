using System.ComponentModel.DataAnnotations;

namespace ATCD.DataAccess.Entity
{
    internal class Choreography
    {
        [Key]
        public int ChoreogrphyId { get; set; }

        public int SongKey { get; set; }

        public Song Song { get; set; }

        public string Name { get; set; }

        public string Data { get; set; }
    }
}