using SurveyTask.Models.AnswerClass;

namespace SurveyTask.Models.QuestionClass
{
    public class QuestionRead
    {
        public int Id { get; set; }

        public string Description { get; set; }

        public bool Required { get; set; }

        public int Type { get; set; }

        public int Index { get; set; }

        public int Order { get; set; }

        public DateTime? DeletedAt { get; set; }

        public ICollection<AnswerRead> Answers { get; set; }
    }
}
