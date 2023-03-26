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

        public AuthorsController()
        {
            authorDomain = new AuthorDomain();
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
    }
}