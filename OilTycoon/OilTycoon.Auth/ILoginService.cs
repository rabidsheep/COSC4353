using OilTycoon.Database.ef;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace OilTycoon.Auth
{
    public interface ILoginService
    {
        bool HasRole(ClaimsPrincipal user, string roleName);
        IEnumerable<string> GetRoles(ClaimsPrincipal user);
        int GetUserId(ClaimsPrincipal user);
        string GetUsername(ClaimsPrincipal user);
        Task<User> GetUser(ClaimsPrincipal user);
        Task<User> ChangePassword(int userId, string rawPassword);
        Task<User> ChangePassword(string userName, string rawPassword);
        Task<User> RegisterUser(User registrant, string rawPassword);
        Task<string> LoginUserForJWT(string userName, string rawPassword);
        Task<bool> IsUserRegistered(string userName);
    }
}
