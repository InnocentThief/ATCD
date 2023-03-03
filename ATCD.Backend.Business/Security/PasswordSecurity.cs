using System.Security.Cryptography;
using System.Text;

namespace ATCD.Backend.Business.Security
{
    /// <summary>
    /// Provides password security by employing salted password hashing.
    /// </summary>
    internal static class PasswordSecurity
    {
        private const int saltLenght = 32;

        /// <summary>
        /// Decodes a base 64 encoded string.
        /// </summary>
        public static string Base64Decode(this string base64EncodedData)
        {
            var base64EncodedBytes = Convert.FromBase64String(base64EncodedData);
            return Encoding.UTF8.GetString(base64EncodedBytes);
        }

        /// <summary>
        /// Creates a password hash and salt value.
        /// </summary>
        /// <param name="password">The chosen password in plaintext.</param>
        /// <returns>The security credentials.</returns>
        /// <exception cref="ArgumentNullException">Thrown if <paramref name="password"/> is null.</exception>
        public static SecurityCredentials CreateSecurityCredentials(string password)
        {
            if (password == null) { throw new ArgumentNullException(nameof(password)); }

            // Create a salt value
            var saltValue = RandomNumberGenerator.GetBytes(saltLenght);

            // Return the user's security credentials
            var plainText = Encoding.ASCII.GetBytes(password);
            var createdPassword = CreatePassword(saltValue, plainText);
            return new SecurityCredentials(createdPassword, saltValue);
        }

        /// <summary>
        /// Compares the hashed password against the stored password.
        /// </summary>
        /// <param name="credentials">The stored security credentials.</param>
        /// <param name="password">The password to compare against the stored credentials.</param>
        /// <returns>True if the password matches the stored credentials; otherwise false.</returns>
        public static bool VerifyPassword(SecurityCredentials credentials, string password)
        {
            if (credentials == null || password == null) { return false; }

            // Compare the values
            (var storedPassword, var storedSaltValue) = credentials;
            var plainText = Encoding.ASCII.GetBytes(password);
            var createdPassword = CreatePassword(storedSaltValue, plainText);
            return CompareByteArray(storedPassword, createdPassword);
        }

        #region Helper methods

        private static byte[] CreatePassword(byte[] saltValue, byte[] plainText)
        {
            // Add the salt to the hash
            var rawSalted = new byte[plainText.Length + saltValue.Length];
            plainText.CopyTo(rawSalted, 0);
            saltValue.CopyTo(rawSalted, plainText.Length);

            // Create the salted hash
            return SHA256.HashData(rawSalted);
        }

        private static bool CompareByteArray(byte[] array1, byte[] array2)
        {
            // Compare thes contents of two byte arrays
            if (array1.Length != array2.Length)
            {
                return false;
            }
            var mismatch = 0;
            for (int i = 0; i < array1.Length; i++)
            {
                mismatch |= array1[i] ^ array2[i];
            }
            return mismatch == 0;
        }

        #endregion
    }
}