const { test, expect } = require("@playwright/test");
const exp = require("constants");

test("Validating whether the element is visible or hidden", async ({
  page,
}) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  //   const element = page.locator("#displayed-text");
  //   const isElementVisible = await element.isVisible();
  //   console.log(isElementVisible);
  //   expect(isElementVisible).toBe(true);
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.click("#hide-textbox");
  await expect(page.locator("#displayed-text")).toBeHidden();
  //   const isElementHidden = await element.isVisible();
  //   console.log(isElementHidden);
  //   expect(isElementHidden).toBe(false);
});

test("Validating page navigation", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page.goto("https://www.google.com/");
  console.log(await page.title());
  await page.goBack();
  console.log(await page.title());
  await page.goForward();
  console.log(await page.title());
  await page.reload();
  console.log(await page.title());
});

test("Validating page alert/popup", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  page.on("dialog", (dialog) => {
    dialog.dismiss();
  });
  await page.locator("#confirmbtn").click();
  await page.locator("#displayed-text").fill("Hello");
  await page.locator("#mousehover").hover();
  await page.getByRole("link", { name: "Top" }).click();
  console.log(page.url());
});
test.only("Exploring frames", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const framePage = page.frameLocator('#courses-iframe');
    await framePage.locator("li a[href*='lifetime-access']:visible").click();
    const subscribers = await framePage.locator('.text h2').textContent();
    console.log(subscribers.split(" ")[1]);
  });
