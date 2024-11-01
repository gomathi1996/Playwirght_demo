const { test, expect } = require("@playwright/test");

test("End to End testing", async ({ page }) => {
  const email = "anshika@gmail.com";
  const pwd = "Iamking@000";
  const productName = "ZARA COAT 3";
  const selectOption = "India";
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill(pwd);
  await page.locator("[value='Login']").click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
  await page
    .locator(".card-body")
    .filter({ hasText: productName })
    .getByRole("button", { name: "Add to Cart" })
    .click();
  await page
    .getByRole("listitem")
    .getByRole("button", { name: "Cart" })
    .click();
  await page.getByRole("heading", { name: productName }).waitFor();
  expect(page.getByText(productName).isVisible).toBeTruthy();

  await page.getByRole("button", { name: "Checkout" }).click();
  await page.getByPlaceholder("Select Country").pressSequentially("ind");
  await page.getByRole("button", { name: selectOption }).nth(1).click();

  await page.locator(':has-text("CVV Code") + input[type="text"]').fill("123");
  await page
    .locator(':has-text("Name on Card") + input[type="text"]')
    .fill("Gomathi");
  expect(page.locator(".user__name input[type='text']")).toHaveValue(email);
  expect(page.locator("[placeholder*='Country']")).toHaveValue(selectOption);
  await page.locator("a.action__submit").click();
  let orderId = await page.locator("label.ng-star-inserted").textContent();
  let extractedID = orderId.replace(/[^a-zA-Z0-9]/g, "");
  const orderedID = extractedID.trim();
  await page.getByRole("button", { name: "ORDERS" }).click();
  await page.getByRole("heading", { name: "Your Orders" }).waitFor();
  await page
    .locator("tbody tr")
    .filter({ hasText: orderedID })
    .getByRole("button", { name: "View" })
    .click();

  expect(await page.locator("div.col-text").textContent()).toBe(extractedID);
});
