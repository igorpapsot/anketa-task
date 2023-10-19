using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SurveyTask.Data;
using SurveyTask.Models.ClientClass;
using SurveyTask.Models.QuestionClass;

namespace SurveyTask.Repositories.QuestionRepo
{
    public class SQLQuestionRepository : IQuestionRepository
    {
        private readonly IMapper mapper;
        private readonly SurveyDbContext dbContext;

        public SQLQuestionRepository(IMapper mapper, SurveyDbContext dbContext)
        {
            this.mapper = mapper;
            this.dbContext = dbContext;
        }


        public async Task<List<QuestionRead>> GetAll()
        {
            var questions = await dbContext.Questions.Include("Answers").ToListAsync();
            //foreach(var question in questions)
            //{
            //    question.Answers = await dbContext.Answers.ToListAsync();
            //}

            return mapper.Map<List<QuestionRead>>(questions);
        }
    }
}
