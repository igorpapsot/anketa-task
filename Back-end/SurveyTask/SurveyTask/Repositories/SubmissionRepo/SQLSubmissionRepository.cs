using Microsoft.EntityFrameworkCore;
using SurveyTask.Data;
using SurveyTask.Models.ClientClass;
using SurveyTask.Models.SubmissionClass;

namespace SurveyTask.Repositories.SubmissionRepo
{
    public class SQLSubmissionRepository : ISubmissionRepository
    {
        private readonly SurveyDbContext dbContext;

        public SQLSubmissionRepository(SurveyDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Submission> CreateSubmission(Submission submission)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Submission>> GetByClientId(int clientId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Submission>> GetByProjectId(int projectId)
        {
            return await dbContext.Submissions.Where(x => x.ProjectId == projectId).ToListAsync(); ;
        }
    }
}
