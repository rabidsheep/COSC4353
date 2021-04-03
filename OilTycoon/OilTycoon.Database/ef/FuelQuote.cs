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
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public int Quantity { get; set; }
        public string DeliveryDate { get; set; }
        public double Price { get; set; }
        public double TotalDue { get; set; }
    }
}
