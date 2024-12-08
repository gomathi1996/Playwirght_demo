import { Locator, Page } from "@playwright/test";

export class OrderPage {

  private page: Page;
  private orderID: Locator;
  private orderLink: Locator;
  private myOrderLink: Locator;
  private orderList: Locator;
  private placedOrderID: Locator;

  constructor(page:Page) {
    this.page = page;
    this.orderID = page.locator("label.ng-star-inserted");
    this.orderLink = page.getByRole("button", { name: "ORDERS" });
    this.myOrderLink = page.getByRole("heading", { name: "Your Orders" });
    this.orderList = page.locator("tbody tr");
    this.placedOrderID = page.locator("div.col-text");
  }

  async getOrderID() {
    let orderID: any = await this.orderID.textContent();
    let extractedID = orderID.replace(/[^a-zA-Z0-9]/g, "");
    const orderedID = extractedID.trim();
    return orderedID;
  }

  async navigateToOrderPage() {
    await this.orderLink.click();
    await this.myOrderLink.waitFor();
  }
  async verifyOrderPlaced(orderID:any) {
    await this.orderList.filter({ hasText: orderID }).getByRole("button", { name: "View" }).click();
    return await this.placedOrderID.textContent();
  }
}
