using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ATCD.Backend.WebApp.Controllers
{
    public abstract class AtcdControllerBase : ControllerBase
    {
        protected int GetAccountKey()
        {
            var identity = (ClaimsIdentity)User.Identity;
            var accountKey = identity.FindFirst("AccountKey").Value;
            return int.Parse(accountKey);
        }

        protected string GetUsername()
        {
            var identity = (ClaimsIdentity)User.Identity;
            return identity.FindFirst("Username").Value;
        }
    }
}