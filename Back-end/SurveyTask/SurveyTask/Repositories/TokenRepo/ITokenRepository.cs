using Microsoft.AspNetCore.Identity;

namespace SurveyTask.Repositories.TokenRepo
{
    public interface ITokenRepository
    {
        string CreateJWTToken(IdentityUser user, string role); 
    }
}
