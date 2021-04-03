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
            quote.Price = GetSuggestedPrice(); // no fooling us with spoofed prices from the client ;)
            quote.TotalDue = Math.Round(quote.Quantity * quote.Price, 2);
            // TODO: use "currentUser" to set address data
            quote.Address1 = "123 Fake St"; // could be `currentUser.Address1`
            quote.Address2 = "Suite 42069"; // could be `currentUser.Address2`
            quote.City = "Houston"; // could be `currentUser.City`
            quote.State = "TX"; // could be `currentUser.State`
            quote.ZipCode = "77000"; // could be `currentUser.ZipCode`

            var result = _FuelQuoteRepo.Add(quote);
            await _FuelQuoteRepo.Save();
            return result;
        }

        [HttpGet]
        [Authorize]
        public double GetSuggestedPrice()
        {
            var rand = new Random(DateTime.Today.Hour);
            return Math.Round(rand.NextDouble() * 2 + 1, 2);
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
