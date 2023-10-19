using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SurveyTask.Migrations
{
    /// <inheritdoc />
    public partial class questions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Required = table.Column<bool>(type: "boolean", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Index = table.Column<int>(type: "integer", nullable: false),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Questions",
                columns: new[] { "Id", "DeletedAt", "Description", "Index", "Order", "Required", "Type" },
                values: new object[,]
                {
                    { 1, null, "How aligned is the project with the initial scope?", 1, 1, true, 1 },
                    { 2, null, "How would you rate the current pace of the project?", 1, 2, true, 1 },
                    { 3, null, "How effective is the current team collaboration?", 1, 3, true, 1 },
                    { 4, null, "Is there clear leadership within the project?", 1, 4, true, 1 },
                    { 5, null, "Has the client's involvement been consistent?", 1, 5, true, 1 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Questions");
        }
    }
}
