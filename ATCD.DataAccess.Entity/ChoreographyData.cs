using System.ComponentModel.DataAnnotations;

namespace ATCD.DataAccess.Entity
{
    internal class ChoreographyData
    {
        [Key]
        public int ChoreographyDataKey { get; set; }

        public int ChoreographyKey { get; set; }

        public int Type { get; set; }

        public bool HasGuide { get; set; }

        public int Beat { get; set; }

        public int Numerator { get; set; }

        public int Denominator { get; set; }

        public int BeatDivision { get; set; }

        public double PositionX { get; set; }

        public double PositionY { get; set; }

        public double PositionZ { get; set; }

        public int BroadcastEventId { get; set; }
    }
}