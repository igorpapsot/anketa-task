using SurveyTask.Models.AnsweredQuestionClass;
using SurveyTask.Models.ProjectClass;
using SurveyTask.Models.WeightVersionClass;

namespace SurveyTask.Models.SubmissionClass
{
    public class Submission
    {
        public Submission()
        {
            AnsweredQuestions = new List<AnsweredQuestion>();
        }

        public int ProjectId { get; set; }

        public int Id { get; set; }

        public int WeightVersionId { get; set; }

        public DateTime? DeletedAt { get; set; }

        public double OriginalScore { get; set; }


        public virtual ICollection<AnsweredQuestion> AnsweredQuestions { get; set; }

        public WeightVersion WeightVersion { get; set; }

        public Project Project { get; set; }


    }
}
