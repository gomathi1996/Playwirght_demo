const {test, expect} = require('@playwright/test');

test('Different ways to take screenshot', async({page})=>{

    await page.goto('https://www.google.com/');
    await page.screenshot({path: 'googleHome.png'});
    await page.screenshot({path: 'googleHomeFullpage.png', fullPage: true});
    await page.locator('.RNNXgb').screenshot({path: 'googleSearchElement.png'});

});
test('Validating the page/element apperance by comparing before and after', async({page})=>{
    await page.goto('https://www.google.com/');
    expect (await page.screenshot()).toMatchSnapshot('googleVisual.png');

})