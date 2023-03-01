using System.ComponentModel.DataAnnotations;

namespace ATCD.DataAccess.Entity
{
    internal class TempoSection
    {
        [Key]
        public int TempoSectionKey { get; set; }

        public int SongKey { get; set; }

        public Song Song { get; set; }

        public decimal StartTimeInSeconds { get; set; }

        public int BeatsPerMeasure { get; set; }

        public decimal BeatsPerMinute { get; set; }

        public bool DoesStartNewMeasure { get; set; }
    }
}