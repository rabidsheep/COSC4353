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
        string GetUsername(ClaimsPrincipal user);
        Task<User> GetUser(ClaimsPrincipal user);
        Task<User> RegisterUser(User registrant, string rawPassword);
        Task<string> LoginUserForJWT(string userName, string rawPassword);

        string GenerateSalt();

        string ComputeHash(string rawPassword, string salt);
        //Task<User> ChangePassword(int id, string rawPassword);

        //string[] ChangePassword(string rawPassword);
    }
}
