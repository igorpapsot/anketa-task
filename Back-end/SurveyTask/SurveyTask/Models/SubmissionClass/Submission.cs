namespace SurveyTask.Models.SubmissionClass
{
    public class Submission
    {
        public int ProjectId { get; set; }

        public int Id { get; set; }

        public int WeightVersionId { get; set; }

        public DateTime? DeletedAt { get; set; }
    }
}
