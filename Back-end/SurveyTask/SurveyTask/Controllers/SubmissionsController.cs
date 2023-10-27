using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SurveyTask.Models.SubmissionClass;
using SurveyTask.Repositories.SubmissionRepo;
using SurveyTask.Repositories.WeightVersionRepo;
using SurveyTask.Services.Submissions;

namespace SurveyTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SubmissionsController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly ISubmissionRepository submissionRepository;
        private readonly IWeightVersionRepository weightVersionRepository;
        private readonly ISubmissionService submissionService;

        public SubmissionsController(IMapper mapper, ISubmissionRepository submissionRepository,
            IWeightVersionRepository weightVersionRepository, ISubmissionService submissionService)
        {
            this.mapper = mapper;
            this.submissionRepository = submissionRepository;
            this.weightVersionRepository = weightVersionRepository;
            this.submissionService = submissionService;
        }

        [HttpGet]
        [Route("{projectId:int}")]
        [Authorize(Roles = "Admin")]
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
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> CreateSubmission([FromBody] SubmissionWrite submissionReq)
        {
            var submission = await submissionService.CreateSubmission(submissionReq);

            return Ok(mapper.Map<SubmissionRead>(submission));
        }

        [HttpGet]
        [Route("Grades/{projectId}/Version/{versionId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetGrades([FromRoute] int projectId, [FromRoute] int versionId)
        {
            var grades = await submissionService.GetGrades(projectId, versionId);

            if (grades == null)
            {
                return NotFound();
            }

            return Ok(grades);
        }

    }
}
