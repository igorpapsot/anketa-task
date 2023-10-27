using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SurveyTask.Models.AuthClass;
using SurveyTask.Repositories.TokenRepo;
using SurveyTask.Services.Auth;

namespace SurveyTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService authService;

        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDTO registerRequestDTO)
        {
            var register = await authService.register(registerRequestDTO.Username, registerRequestDTO.Password);

            if(register)
            {
                return Ok("Succesfully registered");
            }

            return BadRequest("Something went wrong");
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO loginRequestDTO) 
        {
            var jwt = await authService.login(loginRequestDTO.Username, loginRequestDTO.Password);

            if(jwt != "")
            {
                return Ok(jwt);
            }

            return BadRequest("Wrong username or password");
        }
    }
}
