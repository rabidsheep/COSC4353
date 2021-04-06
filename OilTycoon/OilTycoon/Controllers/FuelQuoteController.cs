using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OilTycoon.Auth;
using OilTycoon.Database.ef;
using OilTycoon.Database.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OilTycoon.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FuelQuoteController : ControllerBase
    {
        // Here we list the types of "repositories" or services/classes we might want to access in this context
        IFuelQuoteRepository _FuelQuoteRepo;
        ILoginService _loginService;

        // Here we actually ask for an instance of them and save a reference to them
        public FuelQuoteController(IFuelQuoteRepository FuelQuoteRepo, ILoginService loginService)
        {
            _FuelQuoteRepo = FuelQuoteRepo;
            _loginService = loginService;
        }

        [HttpGet]
        public async Task<IEnumerable<FuelQuote>> GetAll()
        {
            return await _FuelQuoteRepo.GetAll();
        }

        [HttpGet]
        [Authorize]
        public async Task<IEnumerable<FuelQuote>> GetAllForCurrentUser()
        {
            // gets userId of currently logged in user
            var userId = (await _loginService.GetUser(this.User)).Id;
            return await _FuelQuoteRepo.GetWhere(e => e.UserId == userId);
        }

        [HttpPost]
        [Authorize]
        public async Task<FuelQuote> SubmitQuote([FromBody] FuelQuote quote)
        {
            // gets userId of currently logged in user
            var currentUser = await _loginService.GetUser(this.User);

            // overwrite fields the user might try to fill for us
            quote.Quantity = Math.Abs(quote.Quantity);
            quote.Id = 0;
            quote.UserId = currentUser.Id;
            quote.Price = await GetSuggestedPrice(quote.Quantity, currentUser.State); // no fooling us with spoofed prices from the client ;)
            quote.TotalDue = Math.Round(quote.Quantity * quote.Price, 2);
            quote.Address1 = currentUser.Address1;
            quote.Address2 = currentUser.Address2;
            quote.City = currentUser.City;
            quote.State = currentUser.State;
            quote.ZipCode = currentUser.ZipCode;

            var result = _FuelQuoteRepo.Add(quote);
            await _FuelQuoteRepo.Save();
            return result;
        }

        [HttpGet]
        [Authorize]
        public async Task<double> GetSuggestedPrice([FromQuery] int quantity, [FromQuery] string state)
        {
            var userId = _loginService.GetUserId(this.User);

            const double current_price = 1.50;

            // Location Factor = 2% for Texas, 4% for out of state.
            double location_factor = state == "TX" ? 0.02 : 0.04;
            // Rate History Factor = 1% if client requested fuel before, 0% if no history
            double rate_history_factor = (await _FuelQuoteRepo.HasOrderedFuelBefore(userId)) ? 0.01 : 0.00;
            // Gallons Requested Factor = 2% if more than 1000 Gallons, 3% if less
            double gallons_requested_factor = quantity >= 1000 ? 0.02 : 0.03;
            // Company Profit Factor = 10% always
            double company_profit_factor = 0.10; // 10%

            // Margin =  Current Price * (Location Factor - Rate History Factor + Gallons Requested Factor + Company Profit Factor)
            double margin = current_price * (location_factor - rate_history_factor + gallons_requested_factor + company_profit_factor);

            // Suggested Price = Current Price + Margin
            return current_price + margin;

            // Old placeholder price
            // var rand = new Random(DateTime.Today.Hour);
            // return Math.Round(rand.NextDouble() * 2 + 1, 2);
        }

        [HttpGet]
        public async Task<FuelQuote> GetById(int id)
        {
            var results = await _FuelQuoteRepo.GetWhere(e => e.Id == id);
            // .FirstOrDefault() returns the first element in the IEnumerable (otherwise known as Array/List/etc), or the default value of the datatype.
            // In this case, FuelQuote is an object and the default value of an object is `null`.

            // You can see what the default value of a datatype is by reading docs or running 
            // `default(FuelQuote)` or `default(string)` or other datatype and using the debugger to see what value is returned.

            return results.FirstOrDefault();
        }
    }
}
