using ATCD.Backend.Dto.Web;
using ATCD.DataAccess.Entity;

namespace ATCD.Backend.Business.Converter.Web
{
    internal static class ChoreographyConverter
    {
        internal static SongOverviewChoreographyDto ToOverviewDto(this Choreography choreography)
        {
            return new SongOverviewChoreographyDto
            {
                DisplayName = choreography.Name
            };
        }

        internal static List<SongOverviewChoreographyDto> ToOverviewDtos(this ICollection<Choreography> choreographies)
        {
            if (choreographies == null) throw new ArgumentNullException(nameof(choreographies));
            return choreographies.Select(ToOverviewDto).ToList();
        }
    }
}