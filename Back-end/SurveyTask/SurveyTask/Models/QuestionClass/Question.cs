using SurveyTask.Models.AnswerClass;

namespace SurveyTask.Models.QuestionClass
{
        public class Question
        {
            public int Id { get; set; }

            public string Description { get; set; }

            public bool Required { get; set; }

            public int Type { get; set; }

            public int Index { get; set; }

            public int Order { get; set; }

            public DateTime? DeletedAt { get; set; }

            

            public virtual ICollection<Answer> Answers { get; set; }
        }
}
