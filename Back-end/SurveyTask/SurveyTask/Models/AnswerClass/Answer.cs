using SurveyTask.Models.AnsweredQuestionClass;
using SurveyTask.Models.QuestionClass;

namespace SurveyTask.Models.AnswerClass
{
    public class Answer
    {
        public int QuestionId { get; set; }

        public int Id { get; set; }

        public string? Description { get; set; }

        public int Value { get; set; }

        public int Order { get; set; }

        public DateTime? DeletedAt { get; set; }

        public EAnswerType Type { get; set; }



        public Question Question {  get; set; }

        public virtual ICollection<AnsweredQuestion> AnsweredQuestions { get;}
    }
}
