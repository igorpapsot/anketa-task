using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SurveyTask.Data;
using SurveyTask.Models.ProjectClass;

namespace SurveyTask.Repositories.ProjectRepo
{
    public class SQLProjectRepository : IProjectRepository
    {
        private readonly IMapper mapper;
        private readonly SurveyDbContext dbContext;

        public SQLProjectRepository(IMapper mapper, SurveyDbContext dbContext)
        {
            this.mapper = mapper;
            this.dbContext = dbContext;
        }

        public async Task<List<ProjectRead>> GetByClientId(int clientId)
        {
            var projects = await dbContext.Projects.Where(x => x.ClientId == clientId).ToListAsync();

            return mapper.Map<List<ProjectRead>>(projects);
        }
    }
}
