const { LoginPage } = require("./LoginPage");
const { DashboardPage } = require("./DashboardPage");
const { CheckoutPage } = require("./CheckoutPage");
const { OrderPage } = require("./OrderPage");
class POManager{
    constructor(page){
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
module.exports = {POManager};