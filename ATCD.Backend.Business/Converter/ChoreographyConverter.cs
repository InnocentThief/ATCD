using ATCD.Backend.Dto.AudioTrip;
using ATCD.DataAccess.Entity;

namespace ATCD.Backend.Business.Converter
{
    internal static class ChoreographyConverter
    {
        internal static Choreography ToEntity(this ChoreographyDto choreographyDto)
        {
            return new Choreography
            {
                AnimClipPath = choreographyDto.Header.AnimClipPath,
                Beat = choreographyDto.Header.SpawnAheadTime.Beat,
                BuildVersion = choreographyDto.Header.BuildVersion,
                ChoreographyDatas = choreographyDto.Data.Events.ToEntities(),
                ChoreoType = choreographyDto.Header.ChoreoType,
                Denominator = choreographyDto.Header.SpawnAheadTime.Denominator,
                Descriptor = choreographyDto.Header.Descriptor,
                GemRadius = choreographyDto.Header.GemRadius,
                GemSpeed = choreographyDto.Header.GemSpeed,
                HandRadius = choreographyDto.Header.HandRadius,
                Id = choreographyDto.Header.Id,
                MetaData = choreographyDto.Header.MetaData,
                Name = choreographyDto.Header.Name,
                Numerator = choreographyDto.Header.SpawnAheadTime.Numerator,
                RequiredModalities = choreographyDto.Header.RequiredModalities,
            };
        }

        internal static List<Choreography> ToEntities(this List<ChoreographyDto> choreographyDtos)
        {
            if (choreographyDtos == null) { throw new ArgumentNullException(nameof(choreographyDtos)); }
            return choreographyDtos.Select(ToEntity).ToList();
        }

        internal static ChoreographyDto ToDto(this Choreography choreography)
        {
            return new ChoreographyDto
            {
                Header = new HeaderDto
                {
                    Id = choreography.Id,
                    Descriptor = choreography.Descriptor,
                    Name = choreography.Name,
                    MetaData = choreography.MetaData,
                    SpawnAheadTime = new SpawnAheadTimeDto
                    {
                        Beat = choreography.Beat,
                        Denominator = choreography.Denominator,
                        Numerator = choreography.Numerator
                    },
                    GemSpeed = choreography.GemSpeed,
                    GemRadius = choreography.GemRadius,
                    HandRadius = choreography.HandRadius,
                    AnimClipPath = choreography.AnimClipPath,
                    BuildVersion = choreography.BuildVersion,
                    RequiredModalities = choreography.RequiredModalities,
                    ChoreoType = choreography.ChoreoType
                },
                Data = new DataDto
                {
                    Events = choreography.ChoreographyDatas.ToDtos()
                }
            };
        }

        internal static List<ChoreographyDto> ToDtos(this ICollection<Choreography> choreographies)
        {
            if (choreographies == null) { throw new ArgumentNullException(nameof(choreographies)); }
            return choreographies.Select(ToDto).ToList();
        }
    }
}