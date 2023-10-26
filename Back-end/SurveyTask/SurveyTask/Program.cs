using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SurveyTask.Data;
using SurveyTask.Mappings;
using SurveyTask.Repositories.AnswerRepo;
using SurveyTask.Repositories.ClientRepo;
using SurveyTask.Repositories.ProjectRepo;
using SurveyTask.Repositories.QuestionRepo;
using SurveyTask.Repositories.SubmissionRepo;
using SurveyTask.Repositories.TokenRepo;
using SurveyTask.Repositories.WeightRepo;
using SurveyTask.Repositories.WeightVersionRepo;
using SurveyTask.Services.Auth;
using SurveyTask.Services.Submissions;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<SurveyDbContext>(options =>
options.UseNpgsql(builder.Configuration.GetConnectionString("SurveyTaskConnectionString")));

builder.Services.AddDbContext<SurveyAuthDbContext>(options =>
options.UseNpgsql(builder.Configuration.GetConnectionString("SurveyTaskAuthConnetctionString")));

builder.Services.AddScoped<IProjectRepository, SQLProjectRepository>();
builder.Services.AddScoped<IClientRepository, SQLClientRepository>();
builder.Services.AddScoped<IQuestionRepository, SQLQuestionRepository>();
builder.Services.AddScoped<ISubmissionRepository, SQLSubmissionRepository>();
builder.Services.AddScoped<IWeightVersionRepository, SQLWeightVersion>();
builder.Services.AddScoped<IAnswerRepository, SQLAnswerRepository>();
builder.Services.AddScoped<IWeightRepository, SQLWeightRepository>();
builder.Services.AddScoped<ITokenRepository, SQLTokenRepository>();

builder.Services.AddScoped<ISubmissionService, SubmissionService>();
builder.Services.AddScoped<IAuthService, AuthService>();

builder.Services.AddAutoMapper(typeof(AutoMapperProfiles));

builder.Services.AddIdentityCore<IdentityUser>()
    .AddRoles<IdentityRole>()
    .AddTokenProvider<DataProtectorTokenProvider<IdentityUser>>("SurveyAuthDbContext")
    .AddEntityFrameworkStores<SurveyAuthDbContext>()
    .AddDefaultTokenProviders();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 6;
    options.Password.RequireNonAlphanumeric = false;
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
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

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
