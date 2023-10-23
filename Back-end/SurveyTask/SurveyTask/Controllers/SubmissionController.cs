using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SurveyTask.Models.SubmissionClass;
using SurveyTask.Repositories.ProjectRepo;
using SurveyTask.Repositories.SubmissionRepo;

namespace SurveyTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubmissionController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly ISubmissionRepository submissionRepository;

        public SubmissionController(IMapper mapper, ISubmissionRepository submissionRepository)
        {
            this.mapper = mapper;
            this.submissionRepository = submissionRepository;
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetByProjectId([FromRoute] int projectId)
        {
            var projects = await submissionRepository.GetByProjectId(projectId);

            if (projects == null)
            {
                return NotFound();
            }

            return Ok(projects);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetByClientId([FromRoute] int projectId)
        {
            var projects = await submissionRepository.GetByClientId(projectId);

            if (projects == null)
            {
                return NotFound();
            }

            return Ok(projects);
        }
    }
}
