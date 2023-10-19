namespace SurveyTask.Models.ProjectClass
{
    public class ProjectRead
    {
        public int ClientId { get; set; }

        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime? DeletedAt { get; set; }
    }
}
