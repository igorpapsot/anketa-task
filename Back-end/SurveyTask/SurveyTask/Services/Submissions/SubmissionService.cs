using SurveyTask.Models.AnswerClass;
using SurveyTask.Models.GradeClass;
using SurveyTask.Models.SubmissionClass;
using SurveyTask.Repositories.AnswerRepo;
using SurveyTask.Repositories.SubmissionRepo;
using SurveyTask.Repositories.WeightRepo;

namespace SurveyTask.Services.Submissions
{
    public class SubmissionService : ISubmissionService
    {
        private readonly IWeightRepository weightRepository;
        private readonly IAnswerRepository answerRepository;
        private readonly ISubmissionRepository submissionRepository;

        public SubmissionService(IWeightRepository weightRepository, IAnswerRepository answerRepository, ISubmissionRepository submissionRepository)
        {
            this.weightRepository = weightRepository;
            this.answerRepository = answerRepository;
            this.submissionRepository = submissionRepository;
        }

        public async Task<List<Grade>> GetGrades(int projectId)
        {
            var submissions = await submissionRepository.GetByProjectId(projectId);
            var grades = new List<Grade>();

            foreach (Submission submission in submissions)
            {
                var answers = await answerRepository.GetBySubmissionId(submission.Id);
                var grade = new Grade()
                {
                    SubmissionId = submission.Id,
                    WeightVersion = submission.WeightVersion.Id
                };
                foreach (Answer answer in answers)
                {
                    var weight = await weightRepository.GetByVersionIdAndIndex(submission.WeightVersionId, answer.Question.Index);
                    grade.Value = grade.Value + answer.Value * weight.Value;
                }
                grades.Add(grade);
            }

            return grades;
        }
    }
}