using SurveyTask.Models.WeightVersionClass;

namespace SurveyTask.Repositories.WeightVersionRepo
{
    public interface IWeightVersionRepository
    {
        Task<WeightVersion> GetCurrentVersion();
    }
}
