using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SurveyTask.Migrations
{
    /// <inheritdoc />
    public partial class updatingweights : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Questions",
                columns: new[] { "Id", "DeletedAt", "Description", "Index", "Order", "Required", "Type" },
                values: new object[] { 4, null, "Would you like to add something?", 4, 4, false, 0 });

            migrationBuilder.InsertData(
                table: "Weights",
                columns: new[] { "Id", "DeletedAt", "Index", "Value", "WeightVersionId" },
                values: new object[,]
                {
                    { 4, null, 4, 0, 3 },
                    { 5, null, 1, 2, 1 },
                    { 6, null, 2, 2, 1 },
                    { 7, null, 3, 2, 1 },
                    { 8, null, 4, 0, 1 },
                    { 9, null, 1, 2, 2 },
                    { 10, null, 2, 2, 2 },
                    { 11, null, 3, 1, 2 },
                    { 12, null, 4, 0, 2 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Weights",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Weights",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Weights",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Weights",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Weights",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Weights",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Weights",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Weights",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Weights",
                keyColumn: "Id",
                keyValue: 12);
        }
    }
}
