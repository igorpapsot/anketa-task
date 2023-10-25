using SurveyTask.Models.SubmissionClass;

namespace SurveyTask.Repositories.SubmissionRepo
{
    public interface ISubmissionRepository
    {
        Task<List<Submission>> GetByProjectId(int projectId);

        Task<List<Submission>> GetByClientId(int clientId);

        Task<Submission> GetById(int id);

        Task<Submission> Create(Submission submission);
    }
}
