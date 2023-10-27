using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SurveyTask.Models.QuestionClass;
using SurveyTask.Models.WeightVersionClass;
using SurveyTask.Repositories.QuestionRepo;
using SurveyTask.Repositories.WeightVersionRepo;

namespace SurveyTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeightVersionController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IWeightVersionRepository weightVersionRepository;

        public WeightVersionController(IMapper mapper, IWeightVersionRepository weightVersionRepository)
        {
            this.mapper = mapper;
            this.weightVersionRepository = weightVersionRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() {
            var questions = await weightVersionRepository.GetAll();

            return Ok(mapper.Map<List<WeightVersionRead>>(questions));
        }
    }
}
