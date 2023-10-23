using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SurveyTask.Models.AnsweredQuestionClass;
using SurveyTask.Models.SubmissionClass;
using SurveyTask.Repositories.SubmissionRepo;
using SurveyTask.Repositories.WeightVersionRepo;

namespace SurveyTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubmissionsController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly ISubmissionRepository submissionRepository;
        private readonly IWeightVersionRepository weightVersionRepository;

        public SubmissionsController(IMapper mapper, ISubmissionRepository submissionRepository,
            IWeightVersionRepository weightVersionRepository)
        {
            this.mapper = mapper;
            this.submissionRepository = submissionRepository;
            this.weightVersionRepository = weightVersionRepository;
        }

        [HttpGet]
        [Route("{projectId:int}")]
        public async Task<IActionResult> GetByProjectId([FromRoute] int projectId)
        {
            var submissions = await submissionRepository.GetByProjectId(projectId);

            if (submissions == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<List<SubmissionRead>>(submissions));
        }

        [HttpPost]
        public async Task<IActionResult> CreateSubmission([FromBody] SubmissionWrite submissionReq)
        {
            var submission = mapper.Map<Submission>(submissionReq);
            submission.WeightVersionId = weightVersionRepository.GetCurrentVersion().Result.Id;

            submission = await submissionRepository.Create(submission);

            return Ok(mapper.Map<SubmissionRead>(submission));
        }

    }
}
