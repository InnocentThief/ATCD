using ATCD.Backend.Business.Domains;
using ATCD.Backend.Dto.Web;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ATCD.Backend.WebApp.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration config;
        private readonly AccountDomain accountDomain;
        private readonly LoginDomain loginDomain;

        public LoginController(IConfiguration config)
        {
            this.config = config;
            accountDomain = new AccountDomain();
            loginDomain = new LoginDomain();
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("")]
        public async Task<ActionResult<string>> Login(LoginDto loginDto)
        {
            if (loginDto == null) { return BadRequest(); }

            var loginResult = await loginDomain.LoginAsync(loginDto.Username, loginDto.Password);
            if (loginResult == null)
            {
                return Unauthorized();
            }

            var token = GenerateToken(loginResult.Username, loginResult.AccountKey);
            return Ok(token);
        }

        #region Helper methods

        /// <summary>
        /// Creates an authentication token.
        /// </summary>
        /// <param name="username">Contains username to store in the token.</param>
        /// <param name="accountKey">Contains user key to store in the token.</param>
        private string GenerateToken(string username, int accountKey)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name,username),
                new Claim("AccountKey",accountKey.ToString())
            };

            var token = new JwtSecurityToken(config["Jwt:Issuer"],
                config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        #endregion

    }
}
