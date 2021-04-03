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
        public int UserId { get; set; }
        public int Quantity { get; set; }
        public DateTime DeliveryDate { get; set; }
        public double Price { get; set; }
        public double TotalDue { get; set; }
    }
}
