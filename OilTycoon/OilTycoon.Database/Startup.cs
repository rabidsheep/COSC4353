using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OilTycoon.Database.ef;
using OilTycoon.Database.interfaces;
using OilTycoon.Database.repo;

namespace OilTycoon.Database
{
    public static class Startup
    {
        public static IConfiguration _Configuration { get; set; }

        public static IServiceCollection ConfigureDatabaseServices(this IServiceCollection services, IConfiguration configuration)
        {
            _Configuration = configuration;

            // Here is where we define and/or initialize the classes which can be used with dependency injection
            // This means that when we do `services.Add___<T1, T2>( ... );` on some class we can then access it from \
            // any constructor application instead of having to worry about who carries an instance of what

            // There are 3 different `services.Add__()` methods and they are:
            // - AddSingleton
            // - AddScoped
            // - AddTransient

            // The tl;dr for each is:
            // - Transient objects are always different; a new instance is provided to every controller and every service.
            // - Scoped objects are the same within a request, but different across different requests.
            // - Singleton objects are the same for every object and every request.

            // We might use a Singleton if we only want to create "one" instance of a class that is shared,
            // like if we implemented a class that "caches" things. We wouldn't want our cache being emptied
            // out whenever a request finishes, right?
            
            // We might use a Scoped object when we want every "repository" class to share a single connection
            // to the database instead of creating a new connection for every instance of the repository.

            // We might use a Transient object when we don't care what instance is what, or if we want a new one
            // every time. Don't worry about memory usage with Transient objects, they're cleaned up and everything
            // for us.


            // This is scoped so we maintain only 1 database connection per request
            services.AddScoped<DbContext, CustomDbContext>(sp =>
            {
                return new CustomDbContext(
                        new DbContextOptionsBuilder<CustomDbContext>()
                            .UseSqlite(configuration.GetConnectionString("DefaultConnection"))
                            .Options
                    );
            });

            // These are transient because it doesn't matter
            services.AddTransient<IUnitOfWork, BaseUnitOfWork>();
            services.AddTransient<IUserRepository, UserRepository>();

            // And now we're done
            return services;
        }
    }
}
