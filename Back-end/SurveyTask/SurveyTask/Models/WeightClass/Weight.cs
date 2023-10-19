namespace SurveyTask.Models.WeightClass
{
    public class Weight
    {
        public int WeightVersionId { get; set; }

        public int Id { get; set; }

        public int Index { get; set; }

        public int Value { get; set; }

        public DateTime? DeletedAt { get; set; }
    }
}
