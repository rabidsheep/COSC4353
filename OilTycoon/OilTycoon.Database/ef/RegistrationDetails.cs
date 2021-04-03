using OilTycoon.Database.ef;

namespace OilTycoon
{
    public class RegistrationDetails
    {
        public User User { get; set; }
        public string RawPassword { get; set; }
    }
}
