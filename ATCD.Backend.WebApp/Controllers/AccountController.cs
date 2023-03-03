using ATCD.Backend.Business.Domains;
using ATCD.Backend.Dto.Web;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ATCD.Backend.WebApp.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AccountDomain accountDomain;

        public AccountController()
        {
            accountDomain = new AccountDomain();
        }

        [HttpGet]
        [Route("{accountKey}")]
        public async Task<ActionResult<LoginDto>> GetAccount(int accountKey)
        {
            if (accountKey == 0) { return BadRequest(); }
            var login = await accountDomain.GetAccountAsync(accountKey);
            if (login == null) { return BadRequest(); }
            return Ok(login);
        }

        [HttpPost]
        [Route("")]
        public async Task<ActionResult<LoginDto>> CreateOrUpdateAccount(LoginDto loginDto)
        {
            if (loginDto == null) { return BadRequest(); }
            var login = await accountDomain.CreateOrUpdateAccountAsync(loginDto);
            if (login == null) { return BadRequest(); }
            return Ok(login);
        }
    }
}