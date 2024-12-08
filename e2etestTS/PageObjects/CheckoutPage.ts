import {Locator,Page } from "@playwright/test";
export class CheckoutPage{
    private checkoutBtn: Locator;
    private country: Locator;
    private countryList: Locator;
    private ccvCode: Locator;
    private nameOnCard: Locator;
    private cardName: Locator;
    private submitBtn: Locator;
    private selectedCountry: Locator;
    private page: Page;

    constructor(page:Page){
        this.page = page;
        this.checkoutBtn = page.getByRole("button", { name: "Checkout" });
        this.country = page.getByPlaceholder("Select Country");
        this.countryList = page.getByRole("button", { name: "India" });
        this.ccvCode = page.locator(':has-text("CVV Code") + input[type="text"]');
        this.nameOnCard = page.locator(':has-text("Name on Card") + input[type="text"]');
        this.cardName = page.locator(".user__name input[type='text']");
        this.submitBtn = page.locator("a.action__submit");
        this.selectedCountry = page.locator("[placeholder*='Country']");
        }

    async checkoutProduct(){
        await this.checkoutBtn.click();
    }
    async fillCheckoutDetails(){
        await this.country.pressSequentially("ind");
        await this.countryList.nth(1).click();
        await this.ccvCode.fill("123");
        await this.nameOnCard.fill("Rahul Shetty");
    }
    async verifyCardName(){
        const cardName = await this.cardName.inputValue();
        return cardName;
    }
    async verifyCountry(){
        const country = await this.selectedCountry.inputValue();
        return country;
    }
    async placeOrder(){
        await this.submitBtn.click();
    }
}