const { test, expect } = require("@playwright/test");
let webContext;
const email = "testpanni@gmail.com";
const pwd = "Test@123";
let newpage;

test.beforeAll(async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill(pwd);
    await page.locator("[value='Login']").click();
    await page.waitForLoadState("networkidle");
    await context.storageState({path:"state.json"});
    webContext = await browser.newContext({storageState:"state.json"});
})
test.beforeEach(async({})=>
{
    newpage = await webContext.newPage();
})

test("End to End testing", async ({}) => {
  const productName = "ZARA COAT 3";
  const selectOption = "India";
  await newpage.goto("https://rahulshettyacademy.com/client");
  await newpage.locator(".card-body b").first().waitFor();
  await newpage
    .locator(".card-body")
    .filter({ hasText: productName })
    .getByRole("button", { name: "Add to Cart" })
    .click();
  await newpage
    .getByRole("listitem")
    .getByRole("button", { name: "Cart" })
    .click();
  await newpage.getByRole("heading", { name: productName }).waitFor();
  expect(newpage.getByText(productName).isVisible).toBeTruthy();

  await newpage.getByRole("button", { name: "Checkout" }).click();
  await newpage.getByPlaceholder("Select Country").pressSequentially("ind");
  await newpage.getByRole("button", { name: selectOption }).nth(1).click();

  await newpage.locator(':has-text("CVV Code") + input[type="text"]').fill("123");
  await newpage
    .locator(':has-text("Name on Card") + input[type="text"]')
    .fill("Gomathi");
  expect(newpage.locator(".user__name input[type='text']")).toHaveValue(email);
  expect(newpage.locator("[placeholder*='Country']")).toHaveValue(selectOption);
  await newpage.locator("a.action__submit").click();
  let orderId = await newpage.locator("label.ng-star-inserted").textContent();
  let extractedID = orderId.replace(/[^a-zA-Z0-9]/g, "");
  const orderedID = extractedID.trim();
  await newpage.getByRole("button", { name: "ORDERS" }).click();
  await newpage.getByRole("heading", { name: "Your Orders" }).waitFor();
  await newpage
    .locator("tbody tr")
    .filter({ hasText: orderedID })
    .getByRole("button", { name: "View" })
    .click();

  expect(await newpage.locator("div.col-text").textContent()).toBe(extractedID);
});
