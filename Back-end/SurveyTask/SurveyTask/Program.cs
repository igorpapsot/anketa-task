using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SurveyTask.Data;
using SurveyTask.Mappings;
using SurveyTask.Repositories;
using SurveyTask.Repositories.AnswerRepo;
using SurveyTask.Repositories.ClientRepo;
using SurveyTask.Repositories.ProjectRepo;
using SurveyTask.Repositories.QuestionRepo;
using SurveyTask.Repositories.SubmissionRepo;
using SurveyTask.Repositories.WeightRepo;
using SurveyTask.Repositories.WeightVersionRepo;
using SurveyTask.Services.Submissions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<SurveyDbContext>(options =>
options.UseNpgsql(builder.Configuration.GetConnectionString("SurveyTaskConnectionString")));

builder.Services.AddScoped<IProjectRepository, SQLProjectRepository>();
builder.Services.AddScoped<IClientRepository, SQLClientRepository>();
builder.Services.AddScoped<IQuestionRepository, SQLQuestionRepository>();
builder.Services.AddScoped<ISubmissionRepository, SQLSubmissionRepository>();
builder.Services.AddScoped<IWeightVersionRepository, SQLWeightVersion>();
builder.Services.AddScoped<IAnswerRepository, SQLAnswerRepository>();
builder.Services.AddScoped<IWeightRepository, SQLWeightRepository>();
builder.Services.AddScoped<ISubmissionService, SubmissionService>();

builder.Services.AddAutoMapper(typeof(AutoMapperProfiles));

builder.Services.AddCors(o =>
{
    o.AddPolicy("cors", p =>
    {
        p.AllowAnyOrigin()
        .WithMethods("GET", "POST", "PUT", "DELETE")
        .WithHeaders("Content-Type", "Authorization");
    });
}); 

var app = builder.Build();
app.UseCors("cors");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
