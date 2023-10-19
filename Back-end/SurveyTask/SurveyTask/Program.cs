using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SurveyTask.Data;
using SurveyTask.Mappings;
using SurveyTask.Repositories;
using SurveyTask.Repositories.ClientRepo;
using SurveyTask.Repositories.ProjectRepo;
using SurveyTask.Repositories.QuestionRepo;

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

builder.Services.AddAutoMapper(typeof(AutoMapperProfiles));

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
});

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
