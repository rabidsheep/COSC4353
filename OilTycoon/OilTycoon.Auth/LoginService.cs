using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OilTycoon.Database.ef;
using OilTycoon.Database.interfaces;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace OilTycoon.Auth
{
    public class LoginService : ILoginService
    {
        IUserRepository _userRepo;
        SigningInfo _signingInfo;

        public static string RolesClaim = "io.github.rabidwooloo.COSC4353.roles";

        public LoginService(IUserRepository userRepo, SigningInfo signingInfo)
        {
            _userRepo = userRepo;
            _signingInfo = signingInfo;
        }

        public bool HasRole(ClaimsPrincipal user, string roleName)
        {
            var rolesClaim = user.Claims.Where(e => e.Type == RolesClaim).FirstOrDefault();
            if (rolesClaim != null)
            {
                var roles = JsonSerializer.Deserialize<IEnumerable<string>>(rolesClaim.Value, null);
                return roles.Contains(roleName);
            }
            else
            {
                return false;
            }
        }

        public IEnumerable<string> GetRoles(ClaimsPrincipal user)
        {
            var rolesClaim = user.Claims.Where(e => e.Type == RolesClaim).FirstOrDefault();
            if (rolesClaim != null)
            {
                return JsonSerializer.Deserialize<IEnumerable<string>>(rolesClaim.Value, null);
            }
            else
            {
                return null;
            }
        }

        public string GetUsername(ClaimsPrincipal user)
        {
            var identityClaim = user.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).FirstOrDefault();
            if (identityClaim != null)
            {
                return identityClaim.Value;
            }
            else
            {
                return null;
            }
        }

        public async Task<User> GetUser(ClaimsPrincipal user)
        {
            var userName = GetUsername(user);
            var results = await _userRepo.GetWhere(e => e.UserName == userName);
            return results.FirstOrDefault();
        }

        public async Task<User> ChangePassword(int userId, string rawPassword)
        {
            var userData = (await _userRepo.GetWhere(e => e.Id == userId)).FirstOrDefault();

            var salt = GenerateSalt();
            var hashed = ComputeHash(rawPassword, salt);

            userData.PasswordSalt = salt;
            userData.PasswordHash = hashed;

            await _userRepo.Update(userData);
            return userData;
        }

        public async Task<User> RegisterUser(User registrant, string rawPassword)
        {
            if (!await isUserRegistered(registrant.UserName))
            {
                try
                {
                    // overwrite fields the user might try to fill for us
                    registrant.Id = 0;
                    registrant.Roles = new List<string>();
                    registrant.PasswordHash = string.Empty;
                    registrant.PasswordSalt = string.Empty;

                    // attempt to save the user to the database first so that we can have Entity Framework verify if all the required fields were filled
                    var toUpdate = _userRepo.Add(registrant);
                    await _userRepo.Save();

                    // if we've made it this far, we can probably do the password stuff
                    // first, we need a salt
                    var salt = GenerateSalt();

                    // next, we need to hash the password + the salt
                    toUpdate.PasswordHash = ComputeHash(rawPassword, salt);
                    toUpdate.PasswordSalt = salt;

                    await _userRepo.Update(toUpdate);
                    return toUpdate;
                }
                catch (DbUpdateException e)
                {
                    // Some of the values the user provided were missing or invalid
                    return null;
                }
            }
            else
            {
                // A user with that userName already exists
                return null;
            }
        }

        public async Task<string> LoginUserForJWT(string userName, string rawPassword) => GenerateJWTToken(await LoginUser(userName, rawPassword));

        // Some private helper methods

        private async Task<bool> isUserRegistered(string userName) => (await _userRepo.GetWhere(e => e.UserName == userName)).Count() > 0;

        private async Task<User> LoginUser(string userName, string rawPassword)
        {
            if (await isUserRegistered(userName))
            {
                var entry = (await _userRepo.GetWhere(e => e.UserName == userName)).First();
                if (entry.PasswordHash == ComputeHash(rawPassword, entry.PasswordSalt))
                {
                    return entry;
                }
                else
                {
                    // Password did not match
                    return null;
                }
            }
            else
            {
                // A user with that userName doesn't yet exist
                return null;
            }
        }

        private string GenerateJWTToken(User userInfo)
        {
            if (userInfo == null) return null;

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_signingInfo.SecretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.UserName), // Subject
                new Claim(RolesClaim, JsonSerializer.Serialize(userInfo.Roles, null)),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()), // JWT ID
            };
            var token = new JwtSecurityToken(issuer: _signingInfo.Issuer, audience: _signingInfo.Audience, claims: claims, expires: DateTime.Now.AddDays(7), signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string GenerateSalt()
        {
            // Generate the salt with a secure random number generator
            var rng = RandomNumberGenerator.Create();
            var saltBytes = new byte[128];
            rng.GetBytes(saltBytes);
            return BitConverter.ToString(saltBytes);
        }

        private string ComputeHash(string rawPassword, string salt)
        {
            // The salt needs to be used in the same way everywhere, so let's create a dedicated method
            return BitConverter.ToString(SHA256.Create().ComputeHash(Encoding.UTF8.GetBytes($"{rawPassword} {salt}")));
        }

    }
}
