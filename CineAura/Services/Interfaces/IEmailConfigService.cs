using CineAura.Data.DTO;

namespace CineAura.Services.Interfaces
{
    public interface IEmailConfigService
    {
        Task<EmailConfigDTO> Create(EmailConfigDTO dto);
        Task<EmailConfigDTO?> Get();
        Task<EmailConfigDTO> Update(int id, EmailConfigDTO dto);
        Task<bool> Delete(int id);
        Task TestSmtpConnection(EmailConfigDTO configDto);
    }
}
