using Microsoft.EntityFrameworkCore;
using SurveyTask.Data;
using SurveyTask.Models.WeightVersionClass;

namespace SurveyTask.Repositories.WeightVersionRepo
{
    public class SQLWeightVersion : IWeightVersionRepository
    {
        private readonly SurveyDbContext dbContext;

        public SQLWeightVersion(SurveyDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<List<WeightVersion>> GetAll()
        {
            return await dbContext.WeightVersions.ToListAsync(); ;
        }

        public async Task<WeightVersion> GetCurrentVersion()
        {
            var versions = await dbContext.WeightVersions.ToListAsync();

            return versions.OrderByDescending(v => v.VersionNumber).First();
        }
    }
}
