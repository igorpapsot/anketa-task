using AutoMapper;
using SurveyTask.Models.SubmissionClass;
using SurveyTask.Models.WeightVersionClass;
using SurveyTask.Repositories.SubmissionRepo;
using SurveyTask.Repositories.WeightVersionRepo;

namespace SurveyTask.Services.WeightVersions
{
    public class WeightVersionService : IWeightVersionService
    {
        private readonly IMapper mapper;
        private readonly IWeightVersionRepository weightVersionRepository;

        public WeightVersionService(IMapper mapper, IWeightVersionRepository weightVersionRepository)
        {
            this.mapper = mapper;
            this.weightVersionRepository = weightVersionRepository;
        }
        public async Task<WeightVersion> Create(WeightVersionWrite weightVersionWrite)
        {
            var weightVersion = mapper.Map<WeightVersion>(weightVersionWrite);
            weightVersion.DeletedAt = null;
            var current = weightVersionRepository.GetCurrentVersion();
            weightVersion.VersionNumber = current.Result.VersionNumber + 1;

            return await weightVersionRepository.CreateVersion(weightVersion);
        }
    }
}