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
                ChoreographyKey = choreography.ChoreographyKey,
                Id = choreography.Id,
                ChoreographyTypeId = (byte)choreography.ChoreographyType,
                ChoreographyType = choreography.ChoreographyType.ToDisplayText(),
                DisplayName = choreography.Name,
                GemSpeed = choreography.GemSpeed,
                GemRadius = choreography.GemRadius
            };
        }

        internal static List<SongOverviewChoreographyDto> ToOverviewDtos(this ICollection<Choreography> choreographies)
        {
            if (choreographies == null) throw new ArgumentNullException(nameof(choreographies));
            return choreographies.Select(ToOverviewDto).ToList();
        }

        internal static string ToDisplayText(this ChoreographyType choreographyType)
        {
            return choreographyType switch
            {
                ChoreographyType.Easy => "Easy",
                ChoreographyType.Regular => "Regular",
                ChoreographyType.Expert => "Expert",
                ChoreographyType.Cardio => "Cardio",
                _ => "Unkown choreograpy type"
            };
        }

        internal static List<ChoreographyType> ToChoreographyTypes(this List<byte> choreographyTypes)
        {
            var ret = new List<ChoreographyType>();
            foreach (var type in choreographyTypes)
            {
                switch (type)
                {
                    case 1:
                        ret.Add(ChoreographyType.Easy); break;
                    case 2:
                        ret.Add(ChoreographyType.Regular); break;
                    case 3:
                        ret.Add(ChoreographyType.Expert); break;
                    case 4:
                        ret.Add(ChoreographyType.Cardio); break;
                    default:
                        break;
                }
            }
            return ret;
        }
    }
}