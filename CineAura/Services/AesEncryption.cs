using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace CineAura.Services
{
    public static class AesEncryption
    {
        private static readonly string Key;
        private static readonly string IV;

        static AesEncryption()
        {
            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.Development.json", optional: false)
                .Build();

            Key = config["Encryption:Key"];
            IV = config["Encryption:IV"];

            if (string.IsNullOrWhiteSpace(Key) || Key.Length != 32) throw new Exception("encryption key needs to be 32 chars");

            if (string.IsNullOrWhiteSpace(IV) || IV.Length != 16) throw new Exception("IV needs to be 16 chars long");
        }

        public static string Encrypt(string plainText)
        {
            try
            {
                using Aes aes = Aes.Create();
                aes.Key = Encoding.UTF8.GetBytes(Key);
                aes.IV = Encoding.UTF8.GetBytes(IV);

                ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

                using MemoryStream ms = new();
                using CryptoStream cs = new(ms, encryptor, CryptoStreamMode.Write);
                using (StreamWriter sw = new(cs))
                {
                    sw.Write(plainText);
                }

                return Convert.ToBase64String(ms.ToArray());
            }
            catch (Exception ex)
            {
                throw new Exception("encryption failed", ex);
            }            
        }

        public static string Decrypt(string cipherText)
        {
            try
            {
                using Aes aes = Aes.Create();
                aes.Key = Encoding.UTF8.GetBytes(Key);
                aes.IV = Encoding.UTF8.GetBytes(IV);

                ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);

                using MemoryStream ms = new(Convert.FromBase64String(cipherText));
                using CryptoStream cs = new(ms, decryptor, CryptoStreamMode.Read);
                using StreamReader sr = new(cs);

                return sr.ReadToEnd();
            }
            catch (Exception ex)
            {
                throw new Exception("Decryption failed", ex);
            }            
        }
    }
}
