using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SurveyTask.Models.AuthClass;
using SurveyTask.Repositories.TokenRepo;

namespace SurveyTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly ITokenRepository tokenRepository;

        public AuthController(UserManager<IdentityUser> userManager, ITokenRepository tokenRepository)
        {
            this.userManager = userManager;
            this.tokenRepository = tokenRepository;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDTO registerRequestDTO)
        {
            var user = new IdentityUser
            {
                UserName = registerRequestDTO.Username,
                Email = registerRequestDTO.Username
            };

            var result  = await userManager.CreateAsync(user, registerRequestDTO.Password);

            if(result.Succeeded)
            {
                if (registerRequestDTO.Role != null)
                {
                    result = await userManager.AddToRoleAsync(user, registerRequestDTO.Role);

                    if (result.Succeeded)
                    {
                        return Ok("Succesfully registered");
                    }
                }              
            }

            return BadRequest("Something went wrong");
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO loginRequestDTO) 
        {
            var user = await userManager.FindByEmailAsync(loginRequestDTO.Username);

            if(user != null)
            {
                var checkPassword = await userManager.CheckPasswordAsync(user, loginRequestDTO.Password);

                if(checkPassword)
                {
                    var roles = await userManager.GetRolesAsync(user);

                    if(roles != null)
                    {
                        var jwt = tokenRepository.CreateJWTToken(user, roles.First());
                        var response = new LoginResponseDTO
                        {
                            JwtToken = jwt
                        };
                        return Ok(response);
                    }
                }
            }

            return BadRequest("Wrong username or password");
        }
    }
}
