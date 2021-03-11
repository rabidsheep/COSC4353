using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OilTycoon.Auth;
using OilTycoon.Database.ef;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace OilTycoon.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        ILoginService _loginService;

        public AuthController(ILoginService loginService)
        {
            _loginService = loginService;
        }

        [HttpPost]
        [AllowAnonymous]
        //[Route("register")]
        public async Task<User> Register([FromBody] RegistrationDetails item)
        {
            // "RegistrationDetails" just holds a "User" and "rawPassword" in one object
            // Here, we do some checks and save it to the database

            return await _loginService.RegisterUser(item.User, item.RawPassword);
        }

        [HttpPost]
        [AllowAnonymous]
        //[Route("login")]
        public async Task<string> Login([FromQuery] string userName, [FromQuery] string rawPassword)
        {
            // Here, we give back a "JWT" string for the credentials we are given
            return JsonSerializer.Serialize<string>(await _loginService.LoginUserForJWT(userName, rawPassword));
        }

        [HttpGet]
        [Authorize]
        //[Route("GetMeEmbedded")]
        public async Task<dynamic> GetMeEmbedded()
        {
            // Here, we test out what data we can get out of the "currently logged in" user, without a database call!
            return new
            {
                UserName = _loginService.GetUsername(this.User),
                Roles = _loginService.GetRoles(this.User)
            };
        }

        [HttpGet]
        [Authorize]
        //[Route("GetMeDatabase")]
        public async Task<User> GetMeDatabase()
        {
            // Here, we use the data we can get out of the "currently logged in" user to make a complete database call about them
            return await _loginService.GetUser(this.User);
        }
    }
}
