using SurveyTask.Models.AnswerClass;
using SurveyTask.Models.SubmissionClass;

namespace SurveyTask.Models.AnsweredQuestionClass
{
    public class AnsweredQuestion
    {
        public int AnswerId { get; set; }

        public int SubmissionId { get; set; }



        public Answer Answer { get; set; }

        public Submission Submission { get; set; }

    }
}
