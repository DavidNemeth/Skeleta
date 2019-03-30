using Microsoft.EntityFrameworkCore.Migrations;

namespace Skeleta.Migrations
{
    public partial class bugItem_tester : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TesterId",
                table: "BugItems",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_BugItems_TesterId",
                table: "BugItems",
                column: "TesterId");

            migrationBuilder.AddForeignKey(
                name: "FK_BugItems_AspNetUsers_TesterId",
                table: "BugItems",
                column: "TesterId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BugItems_AspNetUsers_TesterId",
                table: "BugItems");

            migrationBuilder.DropIndex(
                name: "IX_BugItems_TesterId",
                table: "BugItems");

            migrationBuilder.DropColumn(
                name: "TesterId",
                table: "BugItems");
        }
    }
}
