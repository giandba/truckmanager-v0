using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TruckManager.InfraStructure.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tbTruck",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ModelType = table.Column<int>(type: "int", nullable: false),
                    ManufactureYear = table.Column<int>(type: "int", nullable: false),
                    ModelYear = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbTruck", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "tbTruck",
                columns: new[] { "Id", "CreatedAt", "ManufactureYear", "ModelType", "ModelYear", "Name", "UpdatedAt" },
                values: new object[] { 1, new DateTime(2021, 6, 18, 19, 33, 19, 555, DateTimeKind.Local).AddTicks(3394), 2021, 1, 2021, "Caminhão 01", new DateTime(2021, 6, 18, 19, 33, 19, 556, DateTimeKind.Local).AddTicks(8730) });

            migrationBuilder.InsertData(
                table: "tbTruck",
                columns: new[] { "Id", "CreatedAt", "ManufactureYear", "ModelType", "ModelYear", "Name", "UpdatedAt" },
                values: new object[] { 2, new DateTime(2021, 6, 18, 19, 33, 19, 557, DateTimeKind.Local).AddTicks(91), 2021, 2, 2021, "Caminhão 02", new DateTime(2021, 6, 18, 19, 33, 19, 557, DateTimeKind.Local).AddTicks(125) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbTruck");
        }
    }
}
