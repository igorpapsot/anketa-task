using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SurveyTask.Migrations
{
    /// <inheritdoc />
    public partial class questionrelationfix2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Answers",
                columns: new[] { "Id", "DeletedAt", "Description", "Order", "QuestionId", "Value" },
                values: new object[,]
                {
                    { 1, null, "1", 1, 1, 1 },
                    { 2, null, "2", 2, 1, 2 },
                    { 3, null, "3", 3, 1, 3 },
                    { 4, null, "Too slow", 1, 2, 1 },
                    { 5, null, "Just right", 2, 2, 2 },
                    { 6, null, "Too fast", 3, 2, 3 },
                    { 7, null, "1", 1, 3, 1 },
                    { 8, null, "2", 2, 3, 2 },
                    { 9, null, "3", 3, 3, 3 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Answers",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Answers",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Answers",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Answers",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Answers",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Answers",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Answers",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Answers",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Answers",
                keyColumn: "Id",
                keyValue: 9);
        }
    }
}
