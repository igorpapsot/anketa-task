using SurveyTask.Models.AnsweredQuestionClass;
using SurveyTask.Models.ProjectClass;
using SurveyTask.Models.WeightVersionClass;

namespace SurveyTask.Models.SubmissionClass
{
    public class SubmissionWrite
    {
        public int ProjectId { get; set; }

        public double? OriginalScore { get; set; }

        public virtual ICollection<AnsweredQuestionWrite> AnsweredQuestions { get; set; }
    }
}
