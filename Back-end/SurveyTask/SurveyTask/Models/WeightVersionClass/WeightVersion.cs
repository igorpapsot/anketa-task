namespace SurveyTask.Models.WeightVersionClass
{
    public class WeightVersion
    {
        public int Id { get; set; }

        public int VersionNumber { get; set; }

        public string VersionName { get; set; }

        public DateTime? DeletedAt { get; set; }
    }
}
