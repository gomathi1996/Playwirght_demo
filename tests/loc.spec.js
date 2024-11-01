const { test, expect } = require("@playwright/test");

test("Exploring different locators available in playwright", async ({
  page,
}) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Employed").click();
  await page.getByLabel("Gender").selectOption("Female");
  await page.getByPlaceholder("Password").fill("Test@123");
  await page.getByRole("button", { name: "Submit" }).click();
  const flag = await page
    .getByText("Success! The Form has been submitted successfully!.")
    .isVisible();
  expect(flag).toBe(true);
  await page.getByRole("link", { name: "Shop" }).click();
  await page
    .locator("app-card")
    .filter({ hasText: "Nokia Edge" })
    .getByRole("button")
    .click();
});
