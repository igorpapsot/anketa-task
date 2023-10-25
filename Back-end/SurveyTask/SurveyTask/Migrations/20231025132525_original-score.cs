using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SurveyTask.Migrations
{
    /// <inheritdoc />
    public partial class originalscore : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "OriginalScore",
                table: "Submissions",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OriginalScore",
                table: "Submissions");
        }
    }
}
