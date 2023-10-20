using SurveyTask.Models.SubmissionClass;
using SurveyTask.Models.WeightClass;

namespace SurveyTask.Models.WeightVersionClass
{
    public class WeightVersion
    {
        public int Id { get; set; }

        public int VersionNumber { get; set; }

        public string VersionName { get; set; }

        public DateTime? DeletedAt { get; set; }


        public virtual ICollection<Submission> Submissions { get; set; }

        public virtual ICollection<Weight> Weights { get; set; }
    }
}
