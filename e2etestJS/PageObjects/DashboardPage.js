class DashboardPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.productText = page.locator(".card-body b");
    this.cart = page.locator("[routerlink*='cart']");
  }

  async searchProductAddCart(productName) {
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
  async verifyProductInCart(productName){
    await this.page.getByRole("heading", { name: productName }).waitFor();
    return await this.page.getByText(productName);
  }
}
module.exports = { DashboardPage };
