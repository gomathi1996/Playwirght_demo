const base = require('@playwright/test');

exports.test = base.extend({
    testDataForOrder: {
        userName: "anshika@gmail.com",
        password: "Iamking@000",
        productName: "ZARA COAT 3",
        selectOption: "India"
    }
})

