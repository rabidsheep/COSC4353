using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OilTycoon.Database.ef
{
    public class FuelQuote
    {
        public int Id { get; set; }
        public double GallonsRequested { get; set; }
        public DateTime DeliveryDate { get; set; }
    }
}
