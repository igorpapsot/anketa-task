using Microsoft.EntityFrameworkCore;
using SurveyTask.Data;
using SurveyTask.Models.WeightClass;

namespace SurveyTask.Repositories.WeightRepo
{
    public class SQLWeightRepository : IWeightRepository
    {
        private readonly SurveyDbContext dbContext;

        public SQLWeightRepository(SurveyDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Weight> GetByVersionIdAndIndex(int versionId, int index)
        {
            return await dbContext.Weights.Where(x => x.WeightVersionId == versionId && x.Index == index).FirstOrDefaultAsync();
        }
    }
}
