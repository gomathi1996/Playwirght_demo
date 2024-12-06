const { test, expect,request} = require("@playwright/test");
const{APiUtils} = require('./utils/ApiUtils');
const { json } = require("stream/consumers");
const logincredentials = {userEmail: "testpanni@gmail.com", userPassword: "Test@123"};
const orderpayload = {orders: [{country: "Cuba", productOrderedId: "6581ca979fd99c85e8ee7faf"}]}
const fakePayload = {data:[],message:"No Orders"}

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

  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async route =>{
    const response = await page.request.fetch(route.request());
    let body = JSON.stringify(fakePayload);
    route.fulfill({
      response,
      body: body
    
    });
  });

  await page.getByRole("button", { name: "ORDERS" }).click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
  console.log(await page.locator(".table-responsive .ng-star-inserted").textContent());
  expect(await page.locator(".table-responsive .ng-star-inserted").textContent()).toContain("You have No Orders to show at this time. Please Visit Back Us");
});
