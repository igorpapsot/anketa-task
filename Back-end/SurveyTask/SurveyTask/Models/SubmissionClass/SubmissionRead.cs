using SurveyTask.Models.AnsweredQuestionClass;
using SurveyTask.Models.ProjectClass;
using SurveyTask.Models.WeightVersionClass;

namespace SurveyTask.Models.SubmissionClass
{
    public class SubmissionRead
    {
        public int ProjectId { get; set; }

        public int Id { get; set; }

        public int WeightVersionId { get; set; }

        public DateTime? DeletedAt
        {
            get; set;
        }

        public double? OriginalScore { get; set; }


        public virtual ICollection<AnsweredQuestionWrite> AnsweredQuestions { get; set; }

        public WeightVersionRead WeightVersion { get; set; }

    }
}