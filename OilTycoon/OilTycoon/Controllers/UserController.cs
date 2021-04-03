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
    }
}
