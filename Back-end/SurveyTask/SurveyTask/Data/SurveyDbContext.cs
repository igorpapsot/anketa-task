using Microsoft.EntityFrameworkCore;
using SurveyTask.Models;
using SurveyTask.Models.AnswerClass;
using SurveyTask.Models.AnsweredQuestionClass;
using SurveyTask.Models.ClientClass;
using SurveyTask.Models.ProjectClass;
using SurveyTask.Models.QuestionClass;
using SurveyTask.Models.SubmissionClass;
using SurveyTask.Models.WeightClass;
using SurveyTask.Models.WeightVersionClass;
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

        public DbSet<Submission> Submissions { get; set; }

        public DbSet<AnsweredQuestion> AnsweredQuestions { get; set; }

        public DbSet<WeightVersion> WeightVersions { get; set; }

        public DbSet<Weight> Weights { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AnsweredQuestion>().HasKey(nameof(AnsweredQuestion.SubmissionId), nameof(AnsweredQuestion.AnswerId));

            //Question - Answers
            modelBuilder.Entity<Question>()
                .HasMany(p => p.Answers)
                .WithOne(g => g.Question)
                .HasForeignKey(p => p.QuestionId);

            //Project - Submissions
            modelBuilder.Entity<Project>()
                .HasMany(p => p.Submissions)
                .WithOne(g => g.Project)
                .HasForeignKey(p => p.ProjectId);

            //Submission - AnsweredQuestions
            modelBuilder.Entity<Submission>()
                .HasMany(p => p.AnsweredQuestions)
                .WithOne(g => g.Submission)
                .HasForeignKey(p => p.SubmissionId);

            //WeightVersion - Submissions
            modelBuilder.Entity<WeightVersion>()
                .HasMany(p => p.Submissions)
                .WithOne(g => g.WeightVersion)
                .HasForeignKey(p => p.WeightVersionId);

            //WeightVersion - Weights
            modelBuilder.Entity<WeightVersion>()
                .HasMany(p => p.Weights)
                .WithOne(g => g.WeightVersion)
                .HasForeignKey(p => p.WeightVersionId);

            //Answer - AnswerdQuestions
            modelBuilder.Entity<Answer>()
                .HasMany(p => p.AnsweredQuestions)
                .WithOne(g => g.Answer)
                .HasForeignKey(p => p.AnswerId);

            //Client - Projects
/*            modelBuilder.Entity<Client>()
                .HasMany(p => p.Projects)
                .WithOne(g => g.Client)
                .HasForeignKey(p => p.ClientId);*/

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
                    Index = 2,
                    Order = 2,
                    DeletedAt = null
                },
                new Question() 
                {
                    Id = 3,
                    Description = "How effective is the current team collaboration?",
                    Required = true,
                    Type = 1,
                    Index = 3,
                    Order = 3,
                    DeletedAt = null
                },
                new Question()
                {
                    Id = 4,
                    Description = "Would you like to add something?",
                    Required = false,
                    Type = 0,
                    Index = 4,
                    Order = 4,
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
                    Order = 1,
                    Type = EAnswerType.Radio
                },

                new Answer()
                {
                    QuestionId = 1,
                    Id = 2,
                    Description = "2",
                    Value = 2,
                    DeletedAt = null,
                    Order = 2,
                    Type = EAnswerType.Radio
                },

                new Answer()
                {
                    QuestionId = 1,
                    Id = 3,
                    Description = "3",
                    Value = 3,
                    DeletedAt = null,
                    Order = 3,
                    Type = EAnswerType.Radio
                },

                new Answer()
                {
                    QuestionId = 2,
                    Id = 4,
                    Description = "Too slow",
                    Value = 1,
                    DeletedAt = null,
                    Order = 1,
                    Type = EAnswerType.Radio
                },

                new Answer()
                {
                    QuestionId = 2,
                    Id = 5,
                    Description = "Just right",
                    Value = 2,
                    DeletedAt = null,
                    Order = 2,
                    Type = EAnswerType.Radio
                },

                new Answer()
                {
                    QuestionId = 2,
                    Id = 6,
                    Description = "Too fast",
                    Value = 3,
                    DeletedAt = null,
                    Order = 3,
                    Type = EAnswerType.Radio
                },

                new Answer()
                {
                    QuestionId = 3,
                    Id = 7,
                    Description = "1",
                    Value = 1,
                    DeletedAt = null,
                    Order = 1,
                    Type = EAnswerType.Radio
                },

                new Answer()
                {
                    QuestionId = 3,
                    Id = 8,
                    Description = "2",
                    Value = 2,
                    DeletedAt = null,
                    Order = 2,
                    Type = EAnswerType.Radio
                },
                new Answer()
                {
                    QuestionId = 3,
                    Id = 9,
                    Description = "3",
                    Value = 3,
                    DeletedAt = null,
                    Order = 3,
                    Type = EAnswerType.Radio
                },
                new Answer()
                {
                    QuestionId = 4,
                    Id = 10,
                    //Description = "3",
                    Value = 0,
                    DeletedAt = null,
                    Order = 4,
                    Type = EAnswerType.Text
                },
            };

            var submission = new List<Submission>() {};

            var answeredQuestions = new List<AnsweredQuestion>(){};

            var weights = new List<Weight>() 
            {

                new Weight() { 
                    Id = 1,
                    Value = 1,
                    WeightVersionId = 3,
                    Index = 1,
                    DeletedAt= null
                },

                new Weight() {
                    Id = 2,
                    Value = 2,
                    WeightVersionId = 3,
                    Index = 2,
                    DeletedAt= null
                },

                new Weight() {
                    Id = 3,
                    Value = 3,
                    WeightVersionId = 3,
                    Index = 3,
                    DeletedAt= null
                },

                new Weight() {
                    Id = 4,
                    Value = 0,
                    WeightVersionId = 3,
                    Index = 4,
                    DeletedAt= null
                },



                new Weight() {
                    Id = 5,
                    Value = 2,
                    WeightVersionId = 1,
                    Index = 1,
                    DeletedAt= null
                },

                new Weight() {
                    Id = 6,
                    Value = 2,
                    WeightVersionId = 1,
                    Index = 2,
                    DeletedAt= null
                },

                new Weight() {
                    Id = 7,
                    Value = 2,
                    WeightVersionId = 1,
                    Index = 3,
                    DeletedAt= null
                },

                new Weight() {
                    Id = 8,
                    Value = 0,
                    WeightVersionId = 1,
                    Index = 4,
                    DeletedAt= null
                },

                
                
                new Weight() {
                    Id = 9,
                    Value = 2,
                    WeightVersionId = 2,
                    Index = 1,
                    DeletedAt= null
                },

                new Weight() {
                    Id = 10,
                    Value = 2,
                    WeightVersionId = 2,
                    Index = 2,
                    DeletedAt= null
                },

                new Weight() {
                    Id = 11,
                    Value = 1,
                    WeightVersionId = 2,
                    Index = 3,
                    DeletedAt= null
                },

                new Weight() {
                    Id = 12,
                    Value = 0,
                    WeightVersionId = 2,
                    Index = 4,
                    DeletedAt= null
                },
            };

            var weightVersions = new List<WeightVersion>() 
            {

                new WeightVersion()
                {
                    Id = 1,
                    VersionName = "Initial version",
                    VersionNumber = 1,
                    DeletedAt = null
                },

                new WeightVersion()
                {
                    Id = 2,
                    VersionName = "Second version",
                    VersionNumber = 2,
                    DeletedAt = null
                },

                new WeightVersion()
                {
                    Id = 3,
                    VersionName = "Third version",
                    VersionNumber = 3,
                    DeletedAt = null
                },
            };

            modelBuilder.Entity<Client>().HasData(clients);

            modelBuilder.Entity<Project>().HasData(projects);

            modelBuilder.Entity<Question>().HasData(questions);

            modelBuilder.Entity<Answer>().HasData(answers);

            modelBuilder.Entity<Submission>().HasData(submission);

            modelBuilder.Entity<AnsweredQuestion>().HasData(answeredQuestions);

            modelBuilder.Entity<Weight>().HasData(weights);

            modelBuilder.Entity<WeightVersion>().HasData(weightVersions);

        }

    }
}
