import {Locator,Page } from "@playwright/test";
export class DashboardPage {
  private page: Page;
  private products: Locator;
  private productText: Locator;
  private cart: Locator;

  constructor(page:Page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.productText = page.locator(".card-body b");
    this.cart = page.locator("[routerlink*='cart']");
  }

  async searchProductAddCart(productName: string) {
    const titles = await this.productText.allTextContents();
    const count = await this.products.count();
    for (let i = 0; i < count; ++i) {
      if (titles[i].includes(productName)) {
        await this.products.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
  }
  async navigateToCart() {
    await this.cart.click();
  }
  async verifyProductInCart(productName:string){
    await this.page.getByRole("heading", { name: productName }).waitFor();
    return await this.page.getByText(productName);
  }
}
