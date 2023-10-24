using SurveyTask.Models.ProjectClass;

namespace SurveyTask.Repositories.ProjectRepo
{
    public interface IProjectRepository
    {
        Task<List<Project>> GetByClientId(int clientId);

        Task<List<Project>> GetAll();
    }
}
