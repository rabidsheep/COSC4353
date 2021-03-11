using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OilTycoon.Auth;
using System;
using System.Collections.Generic;
using System.Linq;

namespace OilTycoon.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        ILoginService _loginService;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, ILoginService loginService)
        {
            _logger = logger;
            _loginService = loginService;
        }

        [HttpGet]
        [Authorize] // this way only "logged in" users can access this endpoint
        public IEnumerable<WeatherForecast> Get()
        {
            // If we wanted to check if the "logged in" user has a specific role or not
            // Here `this.User` is available to this class because we told ASP.NET
            // how we want it to identify users in "OilTycoon.Auth.Startup.cs"

            if(_loginService.HasRole(this.User, "ADMIN"))
            {
                // do something special idk
            }

            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
