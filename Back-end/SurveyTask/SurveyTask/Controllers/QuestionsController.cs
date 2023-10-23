using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SurveyTask.Models.QuestionClass;
using SurveyTask.Repositories.QuestionRepo;

namespace SurveyTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IQuestionRepository questionRepository;

        public QuestionsController(IMapper mapper, IQuestionRepository questionRepository)
        {
            this.mapper = mapper;
            this.questionRepository = questionRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var questions = await questionRepository.GetAll();

            return Ok(mapper.Map<List<QuestionRead>>(questions));
        }

    }
}
