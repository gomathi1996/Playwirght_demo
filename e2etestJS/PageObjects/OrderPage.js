class OrderPage {
  constructor(page) {
    this.page = page;
    this.orderID = page.locator("label.ng-star-inserted");
    this.orderLink = page.getByRole("button", { name: "ORDERS" });
    this.myOrderLink = page.getByRole("heading", { name: "Your Orders" });
    this.orderList = page.locator("tbody tr");
    this.placedOrderID = page.locator("div.col-text");
  }

  async getOrderID() {
    let orderID = await this.orderID.textContent();
    let extractedID = orderID.replace(/[^a-zA-Z0-9]/g, "");
    const orderedID = extractedID.trim();
    return orderedID;
  }

  async navigateToOrderPage() {
    await this.orderLink.click();
    await this.myOrderLink.waitFor();
  }
  async verifyOrderPlaced(orderID) {
    await this.orderList.filter({ hasText: orderID }).getByRole("button", { name: "View" }).click();
    return await this.placedOrderID.textContent();
  }
}
module.exports = { OrderPage };
