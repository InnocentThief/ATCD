using System.ComponentModel.DataAnnotations;

namespace ATCD.DataAccess.Entity
{
    internal class SongEventTrack
    {
        [Key]
        public int SongEventTrackKey { get; set; }

        public int SongKey { get; set; }

        public string EventId { get; set; }

        public List<TrackEvent> TrackEvents { get; set; }
    }
}