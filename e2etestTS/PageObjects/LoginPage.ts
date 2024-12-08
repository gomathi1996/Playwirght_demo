import { Locator, Page } from "@playwright/test";
export class LoginPage {
  private page: Page;
  private username: Locator;
  private password: Locator;
  private loginButton: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.username = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
    this.loginButton = page.locator('[value="Login"]');
  }
  async goTo() {
    await this.page.goto("https://rahulshettyacademy.com/client");
  }

  async validLogin(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState("networkidle");
  }
}
