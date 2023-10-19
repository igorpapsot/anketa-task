using SurveyTask.Models.ProjectClass;

namespace SurveyTask.Repositories.ProjectRepo
{
    public interface IProjectRepository
    {
        Task<List<ProjectRead>> GetByClientId(int clientId);
    }
}
