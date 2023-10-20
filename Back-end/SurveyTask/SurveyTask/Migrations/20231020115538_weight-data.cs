using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SurveyTask.Migrations
{
    /// <inheritdoc />
    public partial class weightdata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 2,
                column: "Index",
                value: 2);

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 3,
                column: "Index",
                value: 3);

            migrationBuilder.InsertData(
                table: "WeightVersions",
                columns: new[] { "Id", "DeletedAt", "VersionName", "VersionNumber" },
                values: new object[,]
                {
                    { 1, null, "Initial version", 1 },
                    { 2, null, "Second version", 2 },
                    { 3, null, "Third version", 3 }
                });

            migrationBuilder.InsertData(
                table: "Weights",
                columns: new[] { "Id", "DeletedAt", "Index", "Value", "WeightVersionId" },
                values: new object[,]
                {
                    { 1, null, 1, 1, 1 },
                    { 2, null, 2, 1, 1 },
                    { 3, null, 3, 1, 1 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "WeightVersions",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "WeightVersions",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Weights",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Weights",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Weights",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "WeightVersions",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 2,
                column: "Index",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 3,
                column: "Index",
                value: 1);
        }
    }
}
