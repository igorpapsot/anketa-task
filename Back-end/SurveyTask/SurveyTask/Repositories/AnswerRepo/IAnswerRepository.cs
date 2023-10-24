using SurveyTask.Models.AnswerClass;

namespace SurveyTask.Repositories.AnswerRepo
{
    public interface IAnswerRepository
    {
        Task<List<Answer>> GetBySubmissionId(int submissionId);
    }
}
