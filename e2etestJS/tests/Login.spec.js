const { expect } = require("@playwright/test");
const { POManager } = require("../PageObjects/POManager");
// JSON -> String -> JS Object
const dataset = JSON.parse(JSON.stringify(require("../utils/placeOrderTestData.json")));

const {test} = require('../utils/test-base')

// test.describe.configure({ mode: 'parallel' });
test.describe.configure({ mode: 'serial' });
for (const data of dataset) {
  test(`End to End testing with ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const checkoutPage = poManager.getCheckoutPage();
    const orderPage = poManager.getOrderPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.userName, data.password);
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();
    expect(
      await dashboardPage.verifyProductInCart(data.productName)
    ).toBeVisible();
    await checkoutPage.checkoutProduct();
    await checkoutPage.fillCheckoutDetails();
    expect(await checkoutPage.verifyCardName()).toContain(data.userName);
    expect(await checkoutPage.verifyCountry()).toContain(data.selectOption);
    await checkoutPage.placeOrder();
    let orderID = await orderPage.getOrderID();
    await orderPage.navigateToOrderPage();
    expect(await orderPage.verifyOrderPlaced(orderID)).toBe(orderID);
  });
}

test(`End to End testing`, async ({ page,testDataForOrder }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const dashboardPage = poManager.getDashboardPage();
  const checkoutPage = poManager.getCheckoutPage();
  const orderPage = poManager.getOrderPage();
  await loginPage.goTo();
  await loginPage.validLogin(testDataForOrder.userName, testDataForOrder.password);
  await dashboardPage.searchProductAddCart(testDataForOrder.productName);
  await dashboardPage.navigateToCart();
  expect(
    await dashboardPage.verifyProductInCart(testDataForOrder.productName)
  ).toBeVisible();
  await checkoutPage.checkoutProduct();
  await checkoutPage.fillCheckoutDetails();
  expect(await checkoutPage.verifyCardName()).toContain(testDataForOrder.userName);
  expect(await checkoutPage.verifyCountry()).toContain(testDataForOrder.selectOption);
  await checkoutPage.placeOrder();
  let orderID = await orderPage.getOrderID();
  await orderPage.navigateToOrderPage();
  expect(await orderPage.verifyOrderPlaced(orderID)).toBe(orderID);
});
