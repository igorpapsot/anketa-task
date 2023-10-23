using AutoMapper;
using SurveyTask.Models.AnswerClass;
using SurveyTask.Models.AnsweredQuestionClass;
using SurveyTask.Models.ClientClass;
using SurveyTask.Models.ProjectClass;
using SurveyTask.Models.QuestionClass;
using SurveyTask.Models.SubmissionClass;

namespace SurveyTask.Mappings
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Client, ClientRead>().ReverseMap();
            CreateMap<Project, ProjectRead>().ReverseMap();
            CreateMap<Question, QuestionRead>().ReverseMap();
            CreateMap<Submission, SubmissionRead>().ReverseMap();
            CreateMap<Submission, SubmissionWrite>().ReverseMap();
            CreateMap<AnsweredQuestion, AnsweredQuestionWrite>().ReverseMap();
            CreateMap<Answer, AnswerRead>()
            .ForMember(dest => dest.QuestionId, opt => opt.MapFrom(src => src.QuestionId))
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
            .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Value))
            .ForMember(dest => dest.Order, opt => opt.MapFrom(src => src.Order))
            .ForMember(dest => dest.DeletedAt, opt => opt.MapFrom(src => src.DeletedAt));
        }
    }
}
