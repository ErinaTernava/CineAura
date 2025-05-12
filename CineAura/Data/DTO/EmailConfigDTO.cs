namespace CineAura.Data.DTO
{
    public class EmailConfigDTO
    {
        public int Id { get; set; }
        public string SenderEmail { get; set; }
        public string DisplayName { get; set; }
        public string SmtpHost { get; set; }
        public int Port { get; set; }
        public bool EnableSsl { get; set; }
        public string EncryptedPassword { get; set; }
    }
}
