using System.Collections.Generic;

namespace OilTycoon.Database.ef
{
    public partial class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }
        public IEnumerable<string> Roles { get; set; } // Not sure if we'll even need this, but I want to include it as an example for storing more complex data structures
    }
}
