namespace SurveyTask.Models.GradeClass
{
    public class Grade
    {
        public int SubmissionId { get; set; }

        public Double Value { get; set; }

        public int? WeightVersion { get; set; }

        public Double OriginalScore { get; set; }
    }
}
