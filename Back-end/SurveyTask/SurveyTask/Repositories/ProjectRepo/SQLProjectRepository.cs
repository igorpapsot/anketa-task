using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SurveyTask.Data;
using SurveyTask.Models.ProjectClass;

namespace SurveyTask.Repositories.ProjectRepo
{
    public class SQLProjectRepository : IProjectRepository
    {
        private readonly SurveyDbContext dbContext;

        public SQLProjectRepository(SurveyDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<List<Project>> GetAll()
        {
            return await dbContext.Projects.ToListAsync();
        }

        public async Task<List<Project>> GetByClientId(int clientId)
        {
            return await dbContext.Projects.Where(x => x.ClientId == clientId).ToListAsync(); ;
        }
    }
}
