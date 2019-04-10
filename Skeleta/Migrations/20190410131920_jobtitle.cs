using Microsoft.EntityFrameworkCore.Migrations;

namespace Skeleta.Migrations
{
    public partial class jobtitle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Job",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<int>(
                name: "JobTitle",
                table: "AspNetUsers",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "JobTitle",
                table: "AspNetUsers",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "Job",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: 0);
        }
    }
}
