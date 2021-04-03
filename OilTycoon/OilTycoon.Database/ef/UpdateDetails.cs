using OilTycoon.Database.ef;

namespace OilTycoon
{
    public class UpdateDetails
    {
        public User User { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
