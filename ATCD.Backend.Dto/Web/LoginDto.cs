namespace ATCD.Backend.Dto.Web
{
    public sealed class LoginDto
    {
        public int AccountKey { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }
    }
}