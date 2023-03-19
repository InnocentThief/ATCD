﻿using ATCD.Backend.Business.Converter.AudioTrip;
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
                Author = song.Author.DisplayName,
                AuthorKey = song.AuthorKey,
                AvgBpm = song.AvgBpm.ToString("#"),
                CoverUrl = song.CoverURL,
                Description = song.Description,
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