const { test, expect,request} = require("@playwright/test");
const{APiUtils} = require('./utils/ApiUtils')
const logincredentials = {userEmail: "testpanni@gmail.com", userPassword: "Test@123"};
const orderpayload = {orders: [{country: "Cuba", productOrderedId: "6581ca979fd99c85e8ee7faf"}]}

let response;
test.beforeAll( async()=>{
  const apicontext = await request.newContext();
  const apiUtils = new APiUtils(apicontext,logincredentials);
  response = await apiUtils.createOrder(orderpayload);
});

test("Place an Order", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");
  await page.getByRole("button", { name: "ORDERS" }).click();
  await page.getByRole("heading", { name: "Your Orders" }).waitFor();
  await page
    .locator("tbody tr")
    .filter({ hasText: response.orderID })
    .getByRole("button", { name: "View" })
    .click();

  expect(await page.locator("div.col-text").textContent()).toBe(response.orderID);
});
