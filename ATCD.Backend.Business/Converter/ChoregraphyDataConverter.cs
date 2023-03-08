using ATCD.Backend.Dto.AudioTrip;
using ATCD.DataAccess.Entity;

namespace ATCD.Backend.Business.Converter
{
    internal static class ChoregraphyDataConverter
    {
        internal static DataEventDto ToDto(this ChoreographyData choreographyData)
        {
            return new DataEventDto
            {
                BeatDivision = choreographyData.BeatDivision,
                BroadcastEventId = choreographyData.BroadcastEventId,
                HasGuide = choreographyData.HasGuide,
                Position = new Position
                {
                    X = choreographyData.PositionX,
                    Y = choreographyData.PositionY,
                    Z = choreographyData.PositionZ
                },
                SubPositions = new List<SubPositionDto>(), // TODO
                Time = new DataEventTimeDto
                {
                    Beat = choreographyData.Beat,
                    Denominator = choreographyData.Denominator,
                    Numerator = choreographyData.Numerator
                },
                Type = choreographyData.Type
            };
        }

        internal static List<DataEventDto> ToDtos(this List<ChoreographyData> choreographyDatas)
        {
            if (choreographyDatas == null) { throw new ArgumentNullException(nameof(choreographyDatas)); }
            return choreographyDatas.Select(ToDto).ToList();
        }
    }
}