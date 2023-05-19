using ATCD.Backend.Business.Domains;
using ATCD.Backend.Dto.Web;
using Microsoft.AspNetCore.Mvc;

namespace ATCD.Backend.WebApp.Controllers
{
    [Route("api/accounts")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AccountDomain accountDomain;
        private readonly AuthorDomain authorDomain;

        public AccountController()
        {
            accountDomain = new AccountDomain();
            authorDomain = new AuthorDomain();
        }

        /// <summary>
        /// Get account info.
        /// </summary>
        /// <param name="accountKey"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{accountKey}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<AccountDto>> GetAccount(int accountKey)
        {
            if (accountKey == 0) { return BadRequest(); }
            var login = await accountDomain.GetAccountAsync(accountKey);
            if (login == null) { return NotFound(); }
            return Ok(login);
        }



        [HttpPost]
        [Route("")]
        public async Task<ActionResult<AccountDto>> CreateOrUpdateAccount(AccountDto accountDto)
        {
            if (accountDto == null) { return BadRequest(); }
            var account = await accountDomain.CreateOrUpdateAccountAsync(accountDto);
            if (account == null) { return BadRequest(); }
            return Ok(account);
        }

        [HttpGet]
        [Route("{accountKey}/authors")]
        public async Task<ActionResult<List<AuthorOverviewDto>>> GetAuthors(int accountKey)
        {
            if (accountKey == 0) { return BadRequest(); }
            var authors = await authorDomain.GetAuthorsForAccountAsync(accountKey);
            return Ok(authors);
        }

        [HttpGet]
        [Route("{accountKey}/publishedSongs")]
        public async Task<ActionResult<List<SongOverviewDto>>> GetPublishedSongs(int accountKey)
        {
            if (accountKey == 0) { return BadRequest(); }
            var publishedSongs = await authorDomain.GetPublishedSongsAsync(accountKey);
            return Ok(publishedSongs);
        }

        [HttpGet]
        [Route("{accountKey}/unpublishedSongs")]
        public async Task<ActionResult<List<SongOverviewDto>>> GetUnpublishedSongs(int accountKey)
        {
            if (accountKey == 0) { return BadRequest(); }
            var unpublishedSongs = await authorDomain.GetUnpublishedSongsAsync(accountKey);
            return Ok(unpublishedSongs);
        }
    }
}