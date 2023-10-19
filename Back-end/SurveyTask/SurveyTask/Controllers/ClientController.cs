using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SurveyTask.Repositories;
using SurveyTask.Repositories.ClientRepo;

namespace SurveyTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IClientRepository clientRepository;

        public ClientController(IMapper mapper, IClientRepository clientRepository)
        {
            this.mapper = mapper;
            this.clientRepository = clientRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var clients = await clientRepository.GetAll();

            return Ok(clients);
        }
    }
}
