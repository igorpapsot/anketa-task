using Microsoft.EntityFrameworkCore;
using SurveyTask.Data;
using SurveyTask.Models.AnswerClass;
using SurveyTask.Models.AnsweredQuestionClass;
using SurveyTask.Models.ProjectClass;

namespace SurveyTask.Repositories.AnswerRepo
{
    public class SQLAnswerRepository : IAnswerRepository
    {
        private readonly SurveyDbContext dbContext;

        public SQLAnswerRepository(SurveyDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<List<Answer>> GetAnsweredQuestions(List<AnsweredQuestion> answerList)
        {
            List<Answer> answers = new List<Answer>();

            foreach (var answer in answerList)
            {
                var found = dbContext.Answers.Where(x => x.Id == answer.AnswerId).Include(x => x.Question).FirstOrDefault();
                answers.Add(found);
            }

            return answers;
        }

        public async Task<List<Answer>> GetBySubmissionId(int submissionId)
        {
            var answeredQuestions = await dbContext.AnsweredQuestions.Where(x => x.SubmissionId == submissionId).Include(x => x.Answer).ThenInclude(x => x.Question).ToListAsync();

            var answers = new List<Answer>();
            foreach (var answer in answeredQuestions)
            {
                answers.Add(answer.Answer);
            }

            return answers;
        }
    }
}
