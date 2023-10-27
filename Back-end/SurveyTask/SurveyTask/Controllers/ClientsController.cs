using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SurveyTask.Models.ClientClass;
using SurveyTask.Repositories;
using SurveyTask.Repositories.ClientRepo;

namespace SurveyTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ClientsController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IClientRepository clientRepository;

        public ClientsController(IMapper mapper, IClientRepository clientRepository)
        {
            this.mapper = mapper;
            this.clientRepository = clientRepository;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> GetAll()
        {
            var clients = await clientRepository.GetAll();

            return Ok(mapper.Map<List<ClientRead>>(clients));
        }
    }
}
