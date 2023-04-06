using ATCD.Backend.Business.Domains;
using ATCD.Backend.Dto.Web;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ATCD.Backend.WebApp.Controllers
{
    [Route("api/genres")]
    [ApiController]
    public class GenresController : ControllerBase
    {
        private readonly SongDomain songDomain;

        public GenresController()
        {
            songDomain = new SongDomain();
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<GenreDto>>> GetGenresAsync()
        {
            await Task.CompletedTask;
            return null;
        }


        [AllowAnonymous]
        [HttpGet]
        [Route("{genreKey}/songs")]
        public async Task<ActionResult<List<SongOverviewDto>>> GetSongsAsync(int genreKey)
        {
            var songOverviewDtos = await songDomain.GetLatestSongsByGenreAsync(genreKey);
            return Ok(songOverviewDtos);
        }
    }
}
