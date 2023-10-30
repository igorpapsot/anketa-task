using SurveyTask.Models.WeightVersionClass;

namespace SurveyTask.Services.WeightVersions
{
    public interface IWeightVersionService
    {
        Task<WeightVersion> Create(WeightVersionWrite weightVersion);
    }
}
