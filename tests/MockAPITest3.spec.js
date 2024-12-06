const { test } = require("@playwright/test");

test("Security test by aborting the files", async ({ page }) => {
  const email = "anshika@gmail.com";
  const pwd = "Iamking@000";
  await page.route("**/*.{jpeg,png,jpg}", (route) => route.abort());
  page.on("request", (request) => console.log(request.url()));
  page.on("response", (response) =>
    console.log(response.url(), response.status())
  );
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill(pwd);
  await page.locator("[value='Login']").click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
  await page.pause();
});
