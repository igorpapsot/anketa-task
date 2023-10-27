using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SurveyTask.Models.ProjectClass;
using SurveyTask.Repositories;
using SurveyTask.Repositories.ProjectRepo;

namespace SurveyTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
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
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> GetByClientId([FromRoute] int id)
        {
            var projects = await projectRepository.GetByClientId(id);

            if (projects == null)
            {
               return NotFound();
            }

            return Ok(mapper.Map<List<ProjectRead>>(projects));

        }

        [HttpGet]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> GetAll()
        {
            var projects = await projectRepository.GetAll();

            if (projects == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<List<ProjectRead>>(projects));

        }
    }
}
