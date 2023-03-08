using ATCD.Backend.Dto.AudioTrip;
using ATCD.DataAccess.Entity;

namespace ATCD.Backend.Business.Converter
{
    internal static class KoreographyConverter
    {
        internal static Koreography ToEntity(this KoreographyDto koreographyDto)
        {
            return new Koreography
            {
                FileId = koreographyDto.FileId,
                PathId = koreographyDto.PathId,
            };
        }
    }
}