using SurveyTask.Models.GradeClass;
using SurveyTask.Models.SubmissionClass;

namespace SurveyTask.Services.Submissions
{
    public interface ISubmissionService
    {
        Task<List<Grade>> GetGrades(int projectId);
    }
}
