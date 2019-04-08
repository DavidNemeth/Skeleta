using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Skeleta.Migrations
{
    public partial class updatedDate_indexes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Projects",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "Projects",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "UpdatedBy",
                table: "Projects",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedDate",
                table: "Projects",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "ProjectMembers",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "ProjectMembers",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "UpdatedBy",
                table: "ProjectMembers",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedDate",
                table: "ProjectMembers",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_TaskItems_UpdatedDate",
                table: "TaskItems",
                column: "UpdatedDate");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_UpdatedDate",
                table: "Projects",
                column: "UpdatedDate");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectMembers_UpdatedDate",
                table: "ProjectMembers",
                column: "UpdatedDate");

            migrationBuilder.CreateIndex(
                name: "IX_BugItems_UpdatedDate",
                table: "BugItems",
                column: "UpdatedDate");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_TaskItems_UpdatedDate",
                table: "TaskItems");

            migrationBuilder.DropIndex(
                name: "IX_Projects_UpdatedDate",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_ProjectMembers_UpdatedDate",
                table: "ProjectMembers");

            migrationBuilder.DropIndex(
                name: "IX_BugItems_UpdatedDate",
                table: "BugItems");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "UpdatedDate",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "ProjectMembers");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "ProjectMembers");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "ProjectMembers");

            migrationBuilder.DropColumn(
                name: "UpdatedDate",
                table: "ProjectMembers");
        }
    }
}
