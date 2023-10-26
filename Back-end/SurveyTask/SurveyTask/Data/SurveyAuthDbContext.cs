using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;

namespace SurveyTask.Data
{
    public class SurveyAuthDbContext : IdentityDbContext
    {
        public SurveyAuthDbContext(DbContextOptions<SurveyAuthDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var userId = "0c716f4b-50b7-4c4b-9b85-29aa1f5091fd";
            var adminId = "356821ea-897a-4484-be56-1396f36ce3bf";

            var roles = new List<IdentityRole>()
            {
                new IdentityRole
                {
                   Id = userId,
                   ConcurrencyStamp = userId,
                   Name = "User", 
                   NormalizedName = "User".ToUpper()
                },
                new IdentityRole{
                   Id = adminId,
                   ConcurrencyStamp = adminId,
                   Name = "Admin",
                   NormalizedName = "Admin".ToUpper()
                }
            };

            builder.Entity<IdentityRole>().HasData(roles);
        }

    }
}
