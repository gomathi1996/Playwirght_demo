import {test as base} from '@playwright/test';
interface testData {
    userName: string;
    password: string;
    productName: string;
    selectOption: string;
}

export const test = base.extend<{testDataForOrder:testData}>({
    testDataForOrder: {
        userName: "anshika@gmail.com",
        password: "Iamking@000",
        productName: "ZARA COAT 3",
        selectOption: "India"
    }
})

