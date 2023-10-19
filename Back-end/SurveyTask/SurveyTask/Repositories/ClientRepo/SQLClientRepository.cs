
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SurveyTask.Data;
using SurveyTask.Models.ClientClass;

namespace SurveyTask.Repositories.ClientRepo
{
    public class SQLClientRepository : IClientRepository
    {
        private readonly IMapper mapper;
        private readonly SurveyDbContext dbContext;

        public SQLClientRepository(IMapper mapper, SurveyDbContext dbContext)
        {
            this.mapper = mapper;
            this.dbContext = dbContext;
        }

        public async Task<List<ClientRead>> GetAll()
        {
            var clients = await dbContext.Clients.ToListAsync();

            return mapper.Map<List<ClientRead>>(clients);
        }

    }
}
