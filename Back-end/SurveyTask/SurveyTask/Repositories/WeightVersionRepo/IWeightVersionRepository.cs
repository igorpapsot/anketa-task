using SurveyTask.Models.WeightVersionClass;

namespace SurveyTask.Repositories.WeightVersionRepo
{
    public interface IWeightVersionRepository
    {
        Task<WeightVersion> GetCurrentVersion();

        Task<List<WeightVersion>> GetAll();

        Task<WeightVersion> CreateVersion(WeightVersion weight);
    }
}
