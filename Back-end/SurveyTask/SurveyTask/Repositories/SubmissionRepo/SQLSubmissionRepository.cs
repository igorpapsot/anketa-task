using Microsoft.EntityFrameworkCore;
using SurveyTask.Data;
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

        public async Task<Submission> Create(Submission submission)
        {
            await dbContext.Submissions.AddAsync(submission);
            await dbContext.SaveChangesAsync();

            // Now you have the submission.Id available
            foreach (var answeredQuestion in submission.AnsweredQuestions)
            {
                answeredQuestion.SubmissionId = submission.Id;
            }

            await dbContext.SaveChangesAsync();

            return submission;
        }

        public async Task<List<Submission>> GetByClientId(int clientId)
        {
            throw new NotImplementedException();
        }

        public Task<Submission> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Submission>> GetByProjectId(int projectId)
        {
            return await dbContext.Submissions.Where(x => x.ProjectId == projectId).Include(x => x.WeightVersion).ThenInclude(x => x.Weights).ToListAsync();
        }
    }
}
