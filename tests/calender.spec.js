const { test, expect } = require("@playwright/test");
const { console } = require("inspector");

test("Calander Handling examples", async ({ page }) => {

    const month= "12";
    const date= "13";
    const year= "2027";
    const expectedArray = [month,date,year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();
    await page.locator(".react-calendar__month-view__days__day:not(.react-calendar__month-view__days__day--neighboringMonth)").nth(Number(date)-1).click();
    const inputs = page.locator(".react-date-picker__inputGroup__input");
    for(let index=0 ; index<inputs.length; index++){
        let value = await inputs(index).getAttribute("value");
        console.log(await inputs(index).getAttribute("value")); 
        expect(value).toEqual(expectedArray[index]);
    }

});