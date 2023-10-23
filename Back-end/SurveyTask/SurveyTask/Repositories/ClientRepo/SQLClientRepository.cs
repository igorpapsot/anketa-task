
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SurveyTask.Data;
using SurveyTask.Models.ClientClass;

namespace SurveyTask.Repositories.ClientRepo
{
    public class SQLClientRepository : IClientRepository
    {
        private readonly SurveyDbContext dbContext;

        public SQLClientRepository(SurveyDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<List<Client>> GetAll()
        {
            return await dbContext.Clients.ToListAsync();
        }

    }
}
