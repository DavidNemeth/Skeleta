using Microsoft.EntityFrameworkCore.Migrations;

namespace Skeleta.Migrations
{
    public partial class takitem_tester : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TesterId",
                table: "TaskItems",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TaskItems_TesterId",
                table: "TaskItems",
                column: "TesterId");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskItems_AspNetUsers_TesterId",
                table: "TaskItems",
                column: "TesterId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskItems_AspNetUsers_TesterId",
                table: "TaskItems");

            migrationBuilder.DropIndex(
                name: "IX_TaskItems_TesterId",
                table: "TaskItems");

            migrationBuilder.DropColumn(
                name: "TesterId",
                table: "TaskItems");
        }
    }
}
