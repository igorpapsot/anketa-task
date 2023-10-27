using Microsoft.AspNetCore.Identity;
using SurveyTask.Models.AuthClass;
using SurveyTask.Repositories.TokenRepo;

namespace SurveyTask.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly ITokenRepository tokenRepository;

        public AuthService(UserManager<IdentityUser> userManager, ITokenRepository tokenRepository)
        {
            this.userManager = userManager;
            this.tokenRepository = tokenRepository;
        }

        public async Task<string> login(string username, string password)
        {
            var user = await userManager.FindByEmailAsync(username);

            if (user != null)
            {
                var checkPassword = await userManager.CheckPasswordAsync(user, password);

                if (checkPassword)
                {
                    var roles = await userManager.GetRolesAsync(user);

                    if (roles != null)
                    {
                        var jwt = tokenRepository.CreateJWTToken(user, roles.First());
                        return jwt;
                    }
                }
            }

            return "";
        }

        public async Task<bool> register(string username, string password)
        {
            var user = new IdentityUser
            {
                UserName = username,
                Email = username
            };

            var result = await userManager.CreateAsync(user, password);

            if (result.Succeeded)
            {
                result = await userManager.AddToRoleAsync(user, "User");

                if (result.Succeeded)
                {
                    return true;
                }
            }

            return false;
        }

    }
}
