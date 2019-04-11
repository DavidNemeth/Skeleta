using Microsoft.EntityFrameworkCore.Migrations;

namespace Skeleta.Migrations
{
    public partial class task_releaseId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ReleaseId",
                table: "TaskItems",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReleaseId",
                table: "TaskItems");
        }
    }
}
