using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class v7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AuthorID",
                table: "FlashCards",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Authors",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Authors", x => x.ID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FlashCards_AuthorID",
                table: "FlashCards",
                column: "AuthorID");

            migrationBuilder.AddForeignKey(
                name: "FK_FlashCards_Authors_AuthorID",
                table: "FlashCards",
                column: "AuthorID",
                principalTable: "Authors",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FlashCards_Authors_AuthorID",
                table: "FlashCards");

            migrationBuilder.DropTable(
                name: "Authors");

            migrationBuilder.DropIndex(
                name: "IX_FlashCards_AuthorID",
                table: "FlashCards");

            migrationBuilder.DropColumn(
                name: "AuthorID",
                table: "FlashCards");
        }
    }
}
