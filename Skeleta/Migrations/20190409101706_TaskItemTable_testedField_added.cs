using Microsoft.EntityFrameworkCore.Migrations;

namespace Skeleta.Migrations
{
    public partial class TaskItemTable_testedField_added : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Tested",
                table: "TaskItems",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Tested",
                table: "TaskItems");
        }
    }
}
