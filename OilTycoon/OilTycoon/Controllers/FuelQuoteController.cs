using Microsoft.AspNetCore.Mvc;
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

        // Here we actually ask for an instance of them and save a reference to them
        public FuelQuoteController(IFuelQuoteRepository FuelQuoteRepo)
        {
            _FuelQuoteRepo = FuelQuoteRepo;
        }

        [HttpGet]
        public async Task<IEnumerable<FuelQuote>> GetAll()
        {
            return await _FuelQuoteRepo.GetAll();
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

        [HttpGet]
        public async Task<FuelQuote> InsertSampleQuote()
        {

            var quote = _FuelQuoteRepo.Add(new FuelQuote
            {
                GallonsRequested = 25.0,
                DeliveryDate = DateTime.Now,
            });

            await _FuelQuoteRepo.Save();

            return quote;
        }
    }
}
