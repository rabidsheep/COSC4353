using OilTycoon.Database.ef;
using System.Threading.Tasks;

namespace OilTycoon.Database.interfaces
{
    // We have to make these interface files because a dependency injection gets buggy unless you do
    // See: https://stackoverflow.com/a/43079630
    public interface IFuelQuoteRepository : IRepository<FuelQuote>
    {
        // some unique functionality
        Task<bool> HasOrderedFuelBefore(int userId);
    }
}
