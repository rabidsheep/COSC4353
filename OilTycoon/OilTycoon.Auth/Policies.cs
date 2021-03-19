using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;

namespace OilTycoon.Auth
{
    public static class Policies
    {
        public static List<string> AllRoles = new List<string>() { "ADMIN", "FINANCE_ADMIN", "SALES_ADMIN", "HR_ADMIN", "TECH_ADMIN" };

        public static void SetupPolicies(AuthorizationOptions config)
        {
            // For every role, add a "policy" or something
            foreach (var role in AllRoles)
            {
                config.AddPolicy(role,
                    new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .RequireRole(role)
                    .Build()
                );
            }
        }
    }
}
