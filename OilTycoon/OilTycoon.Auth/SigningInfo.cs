namespace OilTycoon.Auth
{
    public class SigningInfo
    {
        public string SecretKey { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
    }
}
