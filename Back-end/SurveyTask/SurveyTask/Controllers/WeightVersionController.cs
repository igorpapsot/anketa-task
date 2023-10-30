using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SurveyTask.Models.WeightVersionClass;
using SurveyTask.Repositories.WeightVersionRepo;
using SurveyTask.Services.WeightVersions;

namespace SurveyTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class WeightVersionController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IWeightVersionRepository weightVersionRepository;
        private readonly IWeightVersionService weightVersionService;

        public WeightVersionController(IMapper mapper, IWeightVersionRepository weightVersionRepository, IWeightVersionService weightVersionService)
        {
            this.mapper = mapper;
            this.weightVersionRepository = weightVersionRepository;
            this.weightVersionService = weightVersionService;
        }

        [HttpGet]
        [Authorize(Roles ="Admin,User")]
        public async Task<IActionResult> GetAll() {
            var questions = await weightVersionRepository.GetAll();

            return Ok(mapper.Map<List<WeightVersionRead>>(questions));
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromBody] WeightVersionWrite weightVersion)
        {
            var weightVersionResponse = await weightVersionService.Create(weightVersion);

            return Ok(mapper.Map<WeightVersionRead>(weightVersionResponse));
        }
    }
}