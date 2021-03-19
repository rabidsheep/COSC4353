using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Text.Json;

namespace OilTycoon.Database.ef
{
    public partial class CustomDbContext : DbContext
    {
        public CustomDbContext(DbContextOptions<CustomDbContext> options) : base(options)
        {
            // Creates the local SQLite database if it doesn't already exist
            Database.EnsureCreated();
            
            ///
            // Seed the database with a user account just for testing, so we don't have to manually recreate it ourselves
            ///
            
            // first, we check if the exists already or not
            var superAdmin = Users.FirstOrDefaultAsync(e => e.UserName == "admin").GetAwaiter().GetResult();
            if (superAdmin == null)
            {
                // if the "admin" user doesn't exist already, we're going to add it with this data
                // We add it to the DbSet<> and then we save our changes
                Users.Add(new User()
                {
                    Id = 1,
                    UserName = "admin",
                    // password is "password"
                    PasswordHash = "06-63-E0-8D-5C-89-F4-C8-A2-52-10-59-6A-98-AF-EA-8C-C7-77-34-34-36-B6-7E-EB-07-4D-F5-FD-A4-25-35",
                    PasswordSalt = "78-B9-D9-C7-24-3F-0E-76-11-81-6C-36-21-89-C6-1E-30-78-EA-59-51-20-1C-37-F6-AE-58-E1-ED-C3-39-A2-96-3C-7C-F1-58-E8-DC-46-0C-4B-50-9E-8A-D8-3D-20-51-27-A3-F8-9B-FD-87-5B-AB-A0-F5-2C-D9-23-41-17-71-91-68-80-0C-30-CF-87-43-6B-75-DA-04-F5-13-2D-CD-7D-FA-F0-C5-C9-C7-11-1D-A8-32-73-21-C5-25-83-A8-DA-63-94-15-95-DF-DB-5D-4A-78-2D-BF-52-4A-6C-2E-83-0B-80-C8-AC-4F-3D-78-D0-95-21-BC-2A-3D-11",
                    Roles = new List<string>() { "ADMIN", "FINANCE_ADMIN", "SALES_ADMIN", "HR_ADMIN", "TECH_ADMIN" } // some examples from COSC4351, probably not applicable here
                });
                SaveChanges();
            }
        }

        // Specifies where to store the database on disk
        protected override void OnConfiguring(DbContextOptionsBuilder options) => options.UseSqlite("Data Source=database.db");

        // Where we define the types of tables we're going to have
        // If we wanted to add more tables to the database, we would add another line below this one of similar structure
        // Example: `public virtual DbSet<Quote> Quotes { get; set; }`
        public virtual DbSet<User> Users { get; set; }

        // Where we define the rules of the database, such as if a field is required, a length limit, how its encoded, etc
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // These are our instructions for how to link a C# object to AND from a SQL table
            // If we wanted to add more tables to the database, we would add another `modelBuilder.Entity<ClassNameGoesHere>(entity => { ... })` function call and work from there
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .HasName("PK_Id");

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PasswordHash)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.PasswordSalt)
                    .IsRequired()
                    .IsUnicode(false);

                // Not sure if we'll even need this, but I want to include it as an example for storing more complex data structures
                entity.Property(e => e.Roles)
                    .IsRequired()
                    .HasColumnType("text")
                    .IsUnicode(false)
                    .HasConversion(
                        from => JsonSerializer.Serialize(from, null), // The function we want to call to go: FROM C# native object TO raw text for database storage
                        to => JsonSerializer.Deserialize<IEnumerable<string>>(to, null) // The function we want to call to go: FROM raw text for database storage TO C# native object
                    );
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
