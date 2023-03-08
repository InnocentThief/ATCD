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
                BuildVersion = choreographyDto.Header.BuildVersion,
                ChoreographyDatas = choreographyDto.Data.Events.ToEntities(),
                ChoreoType = choreographyDto.Header.ChoreoType,
                Descriptor = choreographyDto.Header.Descriptor,
                GemRadius = choreographyDto.Header.GemRadius,
                GemSpeed = choreographyDto.Header.GemSpeed,
                HandRadius = choreographyDto.Header.HandRadius,
                Id = choreographyDto.Header.Id,
                Name = choreographyDto.Header.Name,
                RequiredModalities = choreographyDto.Header.RequiredModalities,
            };
        }

        internal static List<Choreography> ToEntities(this List<ChoreographyDto> choreographyDtos)
        {
            if (choreographyDtos == null) { throw new ArgumentNullException(nameof(choreographyDtos)); }
            return choreographyDtos.Select(ToEntity).ToList();
        }
    }
}