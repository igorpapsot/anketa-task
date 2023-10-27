namespace SurveyTask.Services.Auth
{
    public interface IAuthService
    {
        Task<Boolean> register(string username, string password);

        Task<string> login(string username, string password);
    }
}
