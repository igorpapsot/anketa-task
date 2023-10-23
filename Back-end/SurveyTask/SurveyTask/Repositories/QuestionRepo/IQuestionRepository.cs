using SurveyTask.Models.QuestionClass;

namespace SurveyTask.Repositories.QuestionRepo
{
    public interface IQuestionRepository
    {
        Task<List<Question>> GetAll();
    }
}
