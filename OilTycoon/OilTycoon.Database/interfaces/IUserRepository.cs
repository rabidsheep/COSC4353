using OilTycoon.Database.ef;

namespace OilTycoon.Database.interfaces
{
    // We have to make these interface files because a dependency injection gets buggy unless you do
    // See: https://stackoverflow.com/a/43079630
    public interface IUserRepository : IRepository<User>
    {
        // some unique functionality
    }
}
