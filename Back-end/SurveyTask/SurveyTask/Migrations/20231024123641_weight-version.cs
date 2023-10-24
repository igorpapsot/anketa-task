using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SurveyTask.Migrations
{
    /// <inheritdoc />
    public partial class weightversion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Weights",
                keyColumn: "Id",
                keyValue: 1,
                column: "WeightVersionId",
                value: 3);

            migrationBuilder.UpdateData(
                table: "Weights",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Value", "WeightVersionId" },
                values: new object[] { 2, 3 });

            migrationBuilder.UpdateData(
                table: "Weights",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Value", "WeightVersionId" },
                values: new object[] { 3, 3 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Weights",
                keyColumn: "Id",
                keyValue: 1,
                column: "WeightVersionId",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Weights",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Value", "WeightVersionId" },
                values: new object[] { 1, 1 });

            migrationBuilder.UpdateData(
                table: "Weights",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Value", "WeightVersionId" },
                values: new object[] { 1, 1 });
        }
    }
}
