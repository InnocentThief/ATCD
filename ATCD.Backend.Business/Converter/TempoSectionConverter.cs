using ATCD.Backend.Dto.AudioTrip;
using ATCD.DataAccess.Entity;

namespace ATCD.Backend.Business.Converter
{
    internal static class TempoSectionConverter
    {
        internal static TempoSection ToEntity(this TempoSectionDto tempoSectionDto)
        {
            return new TempoSection
            {
                BeatsPerMeasure = tempoSectionDto.BeatsPerMeasure,
                BeatsPerMinute = tempoSectionDto.BeatsPerMinute,
                DoesStartNewMeasure = tempoSectionDto.DoesStartNewMeasure,
                StartTimeInSeconds = tempoSectionDto.StartTimeInSeconds,
            };
        }

        internal static List<TempoSection> ToEntities(this List<TempoSectionDto> tempoSectionDtos)
        {
            if (tempoSectionDtos == null) { throw new ArgumentNullException(nameof(tempoSectionDtos)); }
            return tempoSectionDtos.Select(ToEntity).ToList();
        }
    }
}