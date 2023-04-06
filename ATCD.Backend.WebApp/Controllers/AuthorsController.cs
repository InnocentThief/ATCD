using ATCD.Backend.Business.Domains;
using ATCD.Backend.Dto.Web;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ATCD.Backend.WebApp.Controllers
{
    [Route("api/authors")]
    [ApiController]
    public class AuthorsController : ControllerBase
    {
        private readonly AuthorDomain authorDomain;
        private readonly SongDomain songDomain;

        public AuthorsController()
        {
            authorDomain = new AuthorDomain();
            songDomain = new SongDomain();
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<AuthorOverviewDto>>> Authors()
        {
            var authorOverviewDtos = await authorDomain.GetAuthorsForOverviewAsync();
            return Ok(authorOverviewDtos);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("{authorKey}")]
        public async Task<ActionResult<AuthorOverviewDto>> Author(int authorKey)
        {
            var authorOverviewDto = await authorDomain.GetAuthorForOverviewAsync(authorKey);
            return Ok(authorOverviewDto);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("{authorKey}/songs")]
        public async Task<ActionResult<SongOverviewDto>> Songs(int authorKey)
        {
            var songDtos = await songDomain.GetLatestSongsByAuthorAsync(authorKey);
            return Ok(songDtos);
        }
    }
}