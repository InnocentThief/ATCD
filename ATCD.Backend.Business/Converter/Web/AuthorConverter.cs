using ATCD.Backend.Dto.Web;
using ATCD.DataAccess.Entity;
using Azure.Identity;

namespace ATCD.Backend.Business.Converter.Web
{
    internal static class AuthorConverter
    {
        internal static AuthorOverviewDto ToOverviewDto(this Author author)
        {
            var avgDuration = author.Songs.Average(s => s.SongFullLengthInSeconds);

            return new AuthorOverviewDto
            {
                AuthorKey = author.AuthorKey,
                DisplayName = author.DisplayName,
                AccountId = author.AccountId,
                Description = author.Description,
                PlatformId = author.PlatformId,
                FirstPublished = author.Songs.OrderBy(s => s.Released).First().Released,
                LastPublished = author.Songs.OrderByDescending(s => s.Released).First().Released,
                AvgBpm = author.Songs.Average(s => s.AvgBpm),
                AvgDuration = $"{avgDuration / 60:#}:{avgDuration % 60:#}",
                TotalSongs = author.Songs.Count
            };
        }

        internal static List<AuthorOverviewDto> ToOverviewDtos(this List<Author> authors)
        {
            if (authors == null) throw new ArgumentNullException(nameof(authors));
            return authors.Select(ToOverviewDto).ToList();
        }
    }
}

