using SurveyTask.Models.WeightClass;

namespace SurveyTask.Repositories.WeightRepo
{
    public interface IWeightRepository
    {
        Task<Weight> GetByVersionIdAndIndex(int versionId, int index);
    }
}
