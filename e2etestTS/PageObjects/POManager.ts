import {LoginPage} from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { CheckoutPage } from "./CheckoutPage";
import { OrderPage } from "./OrderPage";
import { Page } from "@playwright/test";
export class POManager{
    private page: Page;
    private LoginPage: LoginPage;
    private DashboardPage: DashboardPage;
    private CheckoutPage: CheckoutPage;
    private OrderPage: OrderPage;

    constructor(page:Page){
        this.page = page;
        this.LoginPage = new LoginPage(this.page);
        this.DashboardPage = new DashboardPage(this.page);
        this.CheckoutPage = new CheckoutPage(this.page);
        this.OrderPage = new OrderPage(this.page);
    }

    getLoginPage(){
        return this.LoginPage;
    }

    getDashboardPage(){
        return this.DashboardPage;
    }

    getCheckoutPage(){
        return this.CheckoutPage;
    }

    getOrderPage(){
        return this.OrderPage;
    }
}