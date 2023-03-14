using ATCD.Backend.Dto.AudioTrip;
using ATCD.DataAccess.Entity;

namespace ATCD.Backend.Business.Converter.AudioTrip
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

        internal static TempoSectionDto ToDto(this TempoSection tempoSection)
        {
            return new TempoSectionDto
            {
                BeatsPerMeasure = tempoSection.BeatsPerMeasure,
                BeatsPerMinute = tempoSection.BeatsPerMinute,
                DoesStartNewMeasure = tempoSection.DoesStartNewMeasure,
                StartTimeInSeconds = tempoSection.StartTimeInSeconds
            };
        }

        internal static List<TempoSectionDto> ToDtos(this List<TempoSection> tempoSections)
        {
            if (tempoSections == null) { throw new ArgumentNullException(nameof(tempoSections)); }
            return tempoSections.Select(ToDto).ToList();
        }
    }
}