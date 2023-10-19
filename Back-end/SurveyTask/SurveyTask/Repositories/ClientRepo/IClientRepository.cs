using SurveyTask.Models.ClientClass;

namespace SurveyTask.Repositories.ClientRepo
{
    public interface IClientRepository
    {
        Task<List<ClientRead>> GetAll();
    }
}
