using SurveyTask.Models.AnswerClass;
using SurveyTask.Models.AnsweredQuestionClass;

namespace SurveyTask.Repositories.AnswerRepo
{
    public interface IAnswerRepository
    {
        Task<List<Answer>> GetBySubmissionId(int submissionId);

        Task<List<Answer>> GetAnsweredQuestions(List<AnsweredQuestion> answerList);

    }
}
