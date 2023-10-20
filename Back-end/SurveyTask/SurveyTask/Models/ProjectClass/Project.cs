using SurveyTask.Models.SubmissionClass;

namespace SurveyTask.Models.ProjectClass
{
    public class Project
    {
        public int ClientId { get; set; }

        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime? DeletedAt { get; set; }


        public virtual ICollection<Submission> Submissions { get; set; }
    }
}
