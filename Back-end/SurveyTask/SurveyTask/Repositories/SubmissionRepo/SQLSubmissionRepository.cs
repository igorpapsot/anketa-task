using SurveyTask.Models.SubmissionClass;

namespace SurveyTask.Repositories.SubmissionRepo
{
    public class SQLSubmissionRepository : ISubmissionRepository
    {
        public Task<Submission> CreateSubmission(Submission submission)
        {
            throw new NotImplementedException();
        }

        public Task<List<Submission>> GetByClientId(int clientId)
        {
            throw new NotImplementedException();
        }

        public Task<List<Submission>> GetByProjectId(int projectId)
        {
            throw new NotImplementedException();
        }
    }
}
