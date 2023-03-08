using ATCD.Backend.Dto.AudioTrip;
using ATCD.DataAccess.Entity;
using System.Data;

namespace ATCD.Backend.Business.Converter
{
    internal static class TrackEventConverter
    {
        internal static TrackEvent ToEntity(this TrackEventDto trackEventDto)
        {
            return new TrackEvent
            {
                EndTimeInSeconds = trackEventDto.EndTimeInSeconds,
                Payload = trackEventDto.Payload,
                PayloadType = trackEventDto.PayloadType,
                StartTimeInSeconds = trackEventDto.StartTimeInSeconds
            };
        }

        internal static List<TrackEvent> ToEntities(this List<TrackEventDto> trackEventDtos)
        {
            if (trackEventDtos == null) { throw new ArgumentNullException(nameof(trackEventDtos)); }
            return trackEventDtos.Select(ToEntity).ToList();
        }
    }
}