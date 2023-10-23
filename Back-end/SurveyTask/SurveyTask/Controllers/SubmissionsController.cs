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
    public class SubmissionsController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly ISubmissionRepository submissionRepository;

        public SubmissionsController(IMapper mapper, ISubmissionRepository submissionRepository)
        {
            this.mapper = mapper;
            this.submissionRepository = submissionRepository;
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

            return Ok(mapper.Map<SubmissionRead>(submissions));
        }

/*        [HttpGet]
        [Route("{clientId:int}")]
        public async Task<IActionResult> GetByClientId([FromRoute] int clientId)
        {
            var submissions = await submissionRepository.GetByClientId(clientId);

            if (submissions == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<SubmissionRead>(submissions));
        }*/

        [HttpPost]
        public async Task<IActionResult> CreateSubmission([FromBody] Submission submission)
        {
            /*var region = mapper.Map<Region>(addRegionDTO);

            region = await regionRepository.CreateAsync(region);

            var RegionDTO = mapper.Map<RegionDTO>(region);

            return CreatedAtAction(nameof(GetById), new { id = RegionDTO.Id }, RegionDTO);*/
            return Ok();
        }
    }
}
