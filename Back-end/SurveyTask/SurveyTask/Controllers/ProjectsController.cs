using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SurveyTask.Models.ProjectClass;
using SurveyTask.Repositories;
using SurveyTask.Repositories.ProjectRepo;

namespace SurveyTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IProjectRepository projectRepository;

        public ProjectsController(IMapper mapper, IProjectRepository projectRepository)
        {
            this.mapper = mapper;
            this.projectRepository = projectRepository;
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetByClientId([FromRoute] int id)
        {
            var projects = await projectRepository.GetByClientId(id);

            if (projects == null)
            {
               return NotFound();
            }

            return Ok(mapper.Map<List<ProjectRead>>(projects));

        }
    }
}
