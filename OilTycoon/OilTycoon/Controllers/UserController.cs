using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OilTycoon.Auth;
using OilTycoon.Database.ef;
using OilTycoon.Database.interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OilTycoon.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        // Here we list the types of "repositories" or services/classes we might want to access in this context
        IUserRepository _userRepo;
        ILoginService _loginService;

        // Here we actually ask for an instance of them and save a reference to them
        public UserController(IUserRepository userRepo, ILoginService loginService)
        {
            _userRepo = userRepo;
            _loginService = loginService;
        }

        [HttpGet]
        public async Task<IEnumerable<User>> GetAll()
        {
            return await _userRepo.GetAll();
        }

        [HttpGet]
        public async Task<User> GetById(int id)
        {
            var results = await _userRepo.GetWhere(e => e.Id == id);
            // .FirstOrDefault() returns the first element in the IEnumerable (otherwise known as Array/List/etc), or the default value of the datatype.
            // In this case, User is an object and the default value of an object is `null`.

            // You can see what the default value of a datatype is by reading docs or running 
            // `default(User)` or `default(string)` or other datatype and using the debugger to see what value is returned.

            return results.FirstOrDefault();
        }

        [HttpGet]
        [Authorize]
        public async Task<User> GetMyself()
        {
            return await _loginService.GetUser(this.User);
        }

        [HttpPost]
        [Authorize]
        public async Task<User> UpdateUser([FromBody] UpdateDetails profileChanges)
        {

            var newInfo = profileChanges.User;
            var currentPw = profileChanges.CurrentPassword;
            var newPw = profileChanges.NewPassword;

            var tempJWT = await _loginService.LoginUserForJWT(newInfo.UserName, currentPw);

            if (tempJWT != null)
            {
                // retrieve current user id
                var userId = (await _loginService.GetUser(this.User)).Id;

                // update password if newPw is new
                if (newPw != null && newPw != " " && newPw != "" && newPw != currentPw)
                {
                    // This does some database reads/writes, so we do it before retrieving "userData" so that its not stale
                    await _loginService.ChangePassword(userId, newPw);
                }

                // retrieve fields that can be modified
                var userData = (await _userRepo.GetWhere(e => e.Id == userId)).FirstOrDefault();

                // update info
                userData.FirstName = newInfo.FirstName;
                userData.LastName = newInfo.LastName;
                userData.Address1 = newInfo.Address1;
                userData.Address2 = newInfo.Address2;
                userData.City = newInfo.City;
                userData.State = newInfo.State;
                userData.ZipCode = newInfo.ZipCode;                

                await _userRepo.Update(userData);
                return userData;
            } else
            {
                return null;
            }
        }
    }
}
