﻿using ATCD.Backend.Business.Converter.Web;
using ATCD.Backend.Dto.Web;
using ATCD.DataAccess.Repository;

namespace ATCD.Backend.Business.Domains
{
    internal sealed class SongDomain
    {
        private readonly SongRepository songRepository;

        public SongDomain()
        {
            songRepository = new SongRepository();
        }

        internal async Task<List<SongOverviewDto>> GetSongsForOverviewAsync(SongSearchDto songSearch)
        {
            var songs = await songRepository.GetSongsForOverviewAsync(songSearch.SearchText, songSearch.ChoreoExcludes, songSearch.Genres, songSearch.ChoreoTypes.ToChoreographyTypes(), songSearch.PublishedFrom, songSearch.PublishedTo, songSearch.Page, songSearch.ItemsPerPage);
            return songs.ToOverviewDtos();
        }

        internal async Task<SongOverviewDto> GetSongForOverviewAsync(int songKey)
        {
            var song = await songRepository.GetSongForOverviewAsync(songKey);
            return song.ToOverviewDto();
        }

        internal async Task<List<SongOverviewDto>> GetLatestSongsByAuthorAsync(int authorKey)
        {
            var songs = await songRepository.GetLatestSongsByAuthorAsync(authorKey);
            return songs.ToOverviewDtos();
        }

        internal async Task<List<GenreDto>> GetGenresAsync()
        {
            var genres = await songRepository.GetGenresAsync();
            return genres.ToGenreDtos();
        }

        internal async Task<List<SongOverviewDto>> GetLatestSongsByGenreAsync(int genreKey)
        {
            var songs = await songRepository.GetLatestSongsByGenreAsync(genreKey);
            return songs.ToOverviewDtos();
        }
    }
}