using ATCD.Backend.Dto.AudioTrip;
using ATCD.DataAccess.Entity;

namespace ATCD.Backend.Business.Converter.AudioTrip
{
    internal static class DataEventConverter
    {
        internal static ChoreographyData ToEntity(this DataEventDto dataEventDto)
        {
            return new ChoreographyData
            {
                Type = dataEventDto.Type,
                HasGuide = dataEventDto.HasGuide,
                Beat = dataEventDto.Time.Beat,
                Numerator = dataEventDto.Time.Numerator,
                Denominator = dataEventDto.Time.Denominator,
                BeatDivision = dataEventDto.BeatDivision,
                PositionX = dataEventDto.Position.X,
                PositionY = dataEventDto.Position.Y,
                PositionZ = dataEventDto.Position.Z,
                BroadcastEventId = dataEventDto.BroadcastEventId,
            };
        }

        internal static List<ChoreographyData> ToEntities(this List<DataEventDto> dataEventDtos)
        {
            if (dataEventDtos == null) { throw new ArgumentNullException(nameof(dataEventDtos)); }
            return dataEventDtos.Select(ToEntity).ToList();
        }
    }
}