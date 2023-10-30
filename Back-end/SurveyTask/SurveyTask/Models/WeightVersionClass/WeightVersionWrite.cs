using SurveyTask.Models.SubmissionClass;
using SurveyTask.Models.WeightClass;

namespace SurveyTask.Models.WeightVersionClass
{
    public class WeightVersionWrite
    {
        public string VersionName { get; set; }

        public virtual ICollection<WeightWrite> Weights { get; set; }
    }
}
