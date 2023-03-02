using System.ComponentModel.DataAnnotations;

namespace ATCD.DataAccess.Entity
{
    internal class TrackEvent
    {
        [Key]
        public int TrackEventKey { get; set; }

        public int SongEventTrackKey { get; set; }

        public double StartTimeInSeconds { get; set; }

        public double EndTimeInSeconds { get; set;}

        public int PayloadType { get; set; }

        public string Payload { get; set; }
    }
}