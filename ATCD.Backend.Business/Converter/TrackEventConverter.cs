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

        internal static TrackEventDto ToDto(this TrackEvent trackEvent)
        {
            return new TrackEventDto
            {
                EndTimeInSeconds = trackEvent.EndTimeInSeconds,
                Payload = trackEvent.Payload,
                PayloadType = trackEvent.PayloadType,
                StartTimeInSeconds = trackEvent.StartTimeInSeconds
            };
        }

        internal static List<TrackEventDto> ToDtos(this List<TrackEvent> trackEvents)
        {
            if (trackEvents == null) { throw new ArgumentNullException(nameof(trackEvents)); }
            return trackEvents.Select(ToDto).ToList();
        }
    }
}