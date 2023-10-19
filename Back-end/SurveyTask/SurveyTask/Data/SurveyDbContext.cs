using Microsoft.EntityFrameworkCore;
using SurveyTask.Models;
using SurveyTask.Models.AnswerClass;
using SurveyTask.Models.ClientClass;
using SurveyTask.Models.ProjectClass;
using SurveyTask.Models.QuestionClass;
using System.Diagnostics;

namespace SurveyTask.Data
{
    public class SurveyDbContext : DbContext
    {
        public SurveyDbContext(DbContextOptions<SurveyDbContext> dbContextOptions) : base(dbContextOptions)
        {
            
        }

        public DbSet<Client> Clients { get; set; }
        
        public DbSet<Project> Projects { get; set; }

        public DbSet<Question> Questions { get; set; }

        public DbSet<Answer> Answers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Question>()
                .HasMany(p => p.Answers)
                .WithOne(g => g.Question)
                .HasForeignKey(p => p.QuestionId);

            var clients = new List<Client>()
            {
                new Client() 
                { 
                    Id = 1,
                    Name = "Idea",
                    DeletedAt = null
                },
                new Client()
                {
                    Id = 2,
                    Name= "Univer",
                    DeletedAt = null
                },
                new Client()
                {
                    Id = 3,
                    Name = "Lidl",
                    DeletedAt = null
                },

            };

            var projects = new List<Project>()
            {
                new Project()
                {
                    ClientId = 1,
                    Id = 1,
                    Name = "Project 1",
                    DeletedAt = null
                },
                new Project()
                {
                    ClientId = 1,
                    Id = 2,
                    Name = "Project 2",
                    DeletedAt = null
                },
                new Project()
                {
                    ClientId = 2,
                    Id = 3,
                    Name = "Project 3",
                    DeletedAt = null
                },
                new Project()
                {
                    ClientId = 3,
                    Id = 4,
                    Name = "Project 4",
                    DeletedAt = null
                },
                new Project()
                {
                    ClientId = 3,
                    Id = 5,
                    Name = "Project 5",
                    DeletedAt = null
                }
            };

            var questions = new List<Question>()
            {
                new Question()
                {
                    Id = 1,
                    Description = "How aligned is the project with the initial scope?",
                    Required = true,
                    Type = 1,
                    Index = 1,
                    Order = 1,
                    DeletedAt = null
                },
                new Question()
                {
                    Id = 2,
                    Description = "How would you rate the current pace of the project?",
                    Required = true,
                    Type = 1,
                    Index = 1,
                    Order = 2,
                    DeletedAt = null
                },
                new Question() 
                {
                    Id = 3,
                    Description = "How effective is the current team collaboration?",
                    Required = true,
                    Type = 1,
                    Index = 1,
                    Order = 3,
                    DeletedAt = null
                }
            };

            var answers = new List<Answer>()
            {

                new Answer()
                {
                    QuestionId = 1,
                    Id = 1,
                    Description = "1",
                    Value = 1,
                    DeletedAt = null,
                    Order = 1
                },

                new Answer()
                {
                    QuestionId = 1,
                    Id = 2,
                    Description = "2",
                    Value = 2,
                    DeletedAt = null,
                    Order = 2
                },

                new Answer()
                {
                    QuestionId = 1,
                    Id = 3,
                    Description = "3",
                    Value = 3,
                    DeletedAt = null,
                    Order = 3
                },

                new Answer()
                {
                    QuestionId = 2,
                    Id = 4,
                    Description = "Too slow",
                    Value = 1,
                    DeletedAt = null,
                    Order = 1
                },

                new Answer()
                {
                    QuestionId = 2,
                    Id = 5,
                    Description = "Just right",
                    Value = 2,
                    DeletedAt = null,
                    Order = 2
                },

                new Answer()
                {
                    QuestionId = 2,
                    Id = 6,
                    Description = "Too fast",
                    Value = 3,
                    DeletedAt = null,
                    Order = 3
                },

                new Answer()
                {
                    QuestionId = 3,
                    Id = 7,
                    Description = "1",
                    Value = 1,
                    DeletedAt = null,
                    Order = 1
                },

                new Answer()
                {
                    QuestionId = 3,
                    Id = 8,
                    Description = "2",
                    Value = 2,
                    DeletedAt = null,
                    Order = 2
                },
                new Answer()
                {
                    QuestionId = 3,
                    Id = 9,
                    Description = "3",
                    Value = 3,
                    DeletedAt = null,
                    Order = 3
                },
            };

            modelBuilder.Entity<Client>().HasData(clients);

            modelBuilder.Entity<Project>().HasData(projects);

            modelBuilder.Entity<Question>().HasData(questions);

            modelBuilder.Entity<Answer>().HasData(answers);

        }

    }
}
