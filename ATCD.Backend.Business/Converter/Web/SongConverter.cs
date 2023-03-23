using ATCD.Backend.Dto.Web;
using ATCD.DataAccess.Entity;

namespace ATCD.Backend.Business.Converter.Web
{
    internal static class SongConverter
    {
        internal static SongOverviewDto ToOverviewDto(this Song song)
        {
            return new SongOverviewDto
            {
                Artist = song.Artist,
                Atr = song.SongKey.ToString("X"), 
                Author = song.Author.DisplayName,
                AuthorKey = song.AuthorKey,
                AvgBpm = song.AvgBpm.ToString("#"),
                Challenge = song.Challenge,
                ContentStrike = song.ContentStrike,
                CoverUrl = song.CoverURL,
                Description = song.Description,
                Explicit = song.Explicit,
                Genre = song.Genre.DisplayName,
                Length = $"{song.SongFullLengthInSeconds / 60:#}:{song.SongFullLengthInSeconds % 60:#}",
                Released = song.Released,
                SongKey = song.SongKey,
                Title = song.Title,
                Choreographies = song.Choreographies.ToOverviewDtos()
            };
        }

        internal static List<SongOverviewDto> ToOverviewDtos(this List<Song> songs)
        {
            if (songs == null) throw new ArgumentNullException(nameof(songs));
            return songs.Select(ToOverviewDto).ToList();
        }
    }
}