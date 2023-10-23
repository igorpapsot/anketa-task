using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SurveyTask.Data;
using SurveyTask.Models.ClientClass;
using SurveyTask.Models.QuestionClass;

namespace SurveyTask.Repositories.QuestionRepo
{
    public class SQLQuestionRepository : IQuestionRepository
    {
        private readonly SurveyDbContext dbContext;

        public SQLQuestionRepository(SurveyDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        public async Task<List<Question>> GetAll()
        {
            return await dbContext.Questions.Include("Answers").ToListAsync(); ;
        }
    }
}
