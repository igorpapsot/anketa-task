using SurveyTask.Models.SubmissionClass;

namespace SurveyTask.Repositories.SubmissionRepo
{
    public interface ISubmissionRepository
    {
        Task<List<SubmissionRead>> GetByProjectId(int projectId);

        Task<List<SubmissionRead>> GetByClientId(int clientId);

        Task<SubmissionWrite> CreateSubmission(Submission submission);
    }
}
