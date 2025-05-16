using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CineAura.Migrations
{
    /// <inheritdoc />
    public partial class removedbool : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPaid",
                table: "Carts");

            migrationBuilder.CreateIndex(
                name: "IX_Ticket_OrderId",
                table: "Ticket",
                column: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_Order_OrderId",
                table: "Ticket",
                column: "OrderId",
                principalTable: "Order",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ticket_Order_OrderId",
                table: "Ticket");

            migrationBuilder.DropIndex(
                name: "IX_Ticket_OrderId",
                table: "Ticket");

            migrationBuilder.AddColumn<bool>(
                name: "IsPaid",
                table: "Carts",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
