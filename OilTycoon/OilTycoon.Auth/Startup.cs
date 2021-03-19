using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;

namespace OilTycoon.Auth
{
    public static class Startup
    {
        public static IConfiguration _Configuration { get; set; }

        public static IServiceCollection ConfigureAuthServices(this IServiceCollection services, IConfiguration configuration)
        {
            _Configuration = configuration;

            // Make signing info that can only be found in the config file be available to the rest of the application
            services.AddScoped<SigningInfo, SigningInfo>(sp =>
            {
                return new SigningInfo()
                {
                    // References the data inside the .NET config file appsettings.json, which is available to us using the "configuration" argument of this function
                    SecretKey = configuration["Jwt:SecretKey"],
                    Issuer = configuration["Jwt:Issuer"],
                    Audience = configuration["Jwt:Audience"]
                };
            });

            // Make our login system available to the rest of the application
            services.AddTransient<ILoginService, LoginService>();

            // Define our login system so ASP.NET can handle that for us correctly
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = configuration["Jwt:Issuer"],
                        ValidAudience = configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:SecretKey"])),
                        ClockSkew = TimeSpan.Zero
                    };
                });

            // (We might not need this)
            // Define our login system so only specific "roles" can access certain things
            services.AddAuthorization(config =>
            {
                Policies.SetupPolicies(config);
            });

            // And now we're done
            return services;
        }
    }
}
