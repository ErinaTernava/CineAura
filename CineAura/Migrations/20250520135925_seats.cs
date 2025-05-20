using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CineAura.Migrations
{
    /// <inheritdoc />
    public partial class seats : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsAvailable",
                table: "Seat",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsOccupied",
                table: "Seat",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsAvailable",
                table: "Seat");

            migrationBuilder.DropColumn(
                name: "IsOccupied",
                table: "Seat");
        }
    }
}
