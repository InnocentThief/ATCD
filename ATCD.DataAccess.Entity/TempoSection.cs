using System.ComponentModel.DataAnnotations;

namespace ATCD.DataAccess.Entity
{
    internal class TempoSection
    {
        [Key]
        public int TempoSectionKey { get; set; }

        public int SongKey { get; set; }

        public double StartTimeInSeconds { get; set; }

        public int BeatsPerMeasure { get; set; }

        public double BeatsPerMinute { get; set; }

        public bool DoesStartNewMeasure { get; set; }
    }
}