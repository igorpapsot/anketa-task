using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SurveyTask.Migrations
{
    /// <inheritdoc />
    public partial class questionrelationfix1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answers_Questions_QuestionDbId",
                table: "Answers");

            migrationBuilder.DropIndex(
                name: "IX_Answers_QuestionDbId",
                table: "Answers");

            migrationBuilder.DropColumn(
                name: "QuestionDbId",
                table: "Answers");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "QuestionDbId",
                table: "Answers",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Answers_QuestionDbId",
                table: "Answers",
                column: "QuestionDbId");

            migrationBuilder.AddForeignKey(
                name: "FK_Answers_Questions_QuestionDbId",
                table: "Answers",
                column: "QuestionDbId",
                principalTable: "Questions",
                principalColumn: "Id");
        }
    }
}
