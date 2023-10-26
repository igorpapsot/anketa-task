using AutoMapper;
using SurveyTask.Models.AnswerClass;
using SurveyTask.Models.GradeClass;
using SurveyTask.Models.ProjectClass;
using SurveyTask.Models.SubmissionClass;
using SurveyTask.Repositories.AnswerRepo;
using SurveyTask.Repositories.SubmissionRepo;
using SurveyTask.Repositories.WeightRepo;
using SurveyTask.Repositories.WeightVersionRepo;

namespace SurveyTask.Services.Submissions
{
    public class SubmissionService : ISubmissionService
    {
        private readonly IWeightRepository weightRepository;
        private readonly IAnswerRepository answerRepository;
        private readonly ISubmissionRepository submissionRepository;
        private readonly IMapper mapper;
        private readonly IWeightVersionRepository weightVersionRepository;

        public SubmissionService(IWeightRepository weightRepository, IAnswerRepository answerRepository,
            ISubmissionRepository submissionRepository, IMapper mapper, IWeightVersionRepository weightVersionRepository)
        {
            this.weightRepository = weightRepository;
            this.answerRepository = answerRepository;
            this.submissionRepository = submissionRepository;
            this.mapper = mapper;
            this.weightVersionRepository = weightVersionRepository;
        }

        public async Task<Submission> CreateSubmission(SubmissionWrite submissionReq)
        {
            var submission = mapper.Map<Submission>(submissionReq);
            submission.WeightVersionId = weightVersionRepository.GetCurrentVersion().Result.Id;
            submission.OriginalScore = GetGrade(submission).Result.Value;
            

            return await submissionRepository.Create(submission);
        }

        public async Task<Grade> GetGrade(Submission submission)
        {
            var answers = await answerRepository.GetAnsweredQuestions((List<Models.AnsweredQuestionClass.AnsweredQuestion>)submission.AnsweredQuestions);
            var grade = new Grade() { SubmissionId = submission.Id };
            foreach (Answer answer in answers)
            {
                var weight = await weightRepository.GetByVersionIdAndIndex(submission.WeightVersionId, answer.Question.Index);
                grade.Value = grade.Value + answer.Value * weight.Value;
            }
            return grade;
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
                    WeightVersion = submission.WeightVersion.Id,
                    OriginalScore = submission.OriginalScore
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