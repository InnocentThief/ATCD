using ATCD.Backend.Business.Domains;
using ATCD.Backend.Dto.Web;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ATCD.Backend.WebApp.Controllers
{
    [Route("api/account")]
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

        [AllowAnonymous]
        [HttpPost]
        [Route("")]
        public async Task Login(LoginDto loginDto)
        {

        }

        [HttpGet]
        [Route("{accountKey}")]
        public async Task<ActionResult<AccountDto>> GetAccount(int accountKey)
        {
            if (accountKey == 0) { return BadRequest(); }
            var login = await accountDomain.GetAccountAsync(accountKey);
            if (login == null) { return BadRequest(); }
            return Ok(login);
        }

        [HttpPost]
        [Route("")]
        public async Task<ActionResult<LoginDto>> CreateOrUpdateAccount(AccountDto accountDto)
        {
            if (accountDto == null) { return BadRequest(); }
            var account = await accountDomain.CreateOrUpdateAccountAsync(accountDto);
            if (account == null) { return BadRequest(); }
            return Ok(account);
        }

        [AllowAnonymous] // Remove this
        [HttpGet]
        [Route("{accountKey}/authors")]
        public async Task<ActionResult<List<AuthorOverviewDto>>> GetAuthors(int accountKey)
        {
            if (accountKey == 0) { return BadRequest(); }
            var authors = await authorDomain.GetAuthorsForAccountAsync(accountKey);
            return Ok(authors);
        }
    }
}