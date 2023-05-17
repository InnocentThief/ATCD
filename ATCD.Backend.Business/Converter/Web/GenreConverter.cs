using ATCD.Backend.Dto.Web;
using ATCD.DataAccess.Entity;

namespace ATCD.Backend.Business.Converter.Web
{
    internal static class GenreConverter
    {
        internal static GenreDto ToGenreDto(this Genre genre)
        {
            return new GenreDto
            {
                DisplayName = genre.DisplayName,
                GenreKey = genre.GenreKey
            };
        }

        internal static List<GenreDto> ToGenreDtos(this List<Genre> genres)
        {
            if (genres == null) throw new ArgumentNullException(nameof(genres));
            return genres.Select(ToGenreDto).ToList();
        }
    }
}