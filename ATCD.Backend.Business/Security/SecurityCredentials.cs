namespace ATCD.Backend.Business.Security
{
    /// <summary>
    /// Encapsulates the users's security credentials.
    /// </summary>
    internal sealed class SecurityCredentials
    {
        public byte[] PasswordHash { get; }

        public byte[] SaltValue { get; }

        public SecurityCredentials(byte[] passwordHash, byte[] saltValue)
        {
            PasswordHash = passwordHash ?? throw new ArgumentNullException(nameof(passwordHash));
            SaltValue = saltValue ?? throw new ArgumentNullException(nameof(saltValue));
        }

        public void Deconstruct(out byte[] passwordHash, out byte[] saltValue)
        {
            passwordHash = PasswordHash;
            saltValue = SaltValue;
        }
    }
}