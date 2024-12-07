class APiUtils{
    constructor(apicontext,logincredentials){
        this.apicontext = apicontext;
        this.logincredentials = logincredentials;
    } 
    

async getToken(){
  const loginresponse = await this.apicontext.post('https://rahulshettyacademy.com/api/ecom/auth/login', { data: this.logincredentials});
  console.log(loginresponse.status());
  console.log(loginresponse.statusText());
//   expect(loginresponse.ok()).toBeTruthy();
  const loginresponsejson = await loginresponse.json();
  console.log(loginresponsejson.message);
  const token = loginresponsejson.token;
  console.log(token);
  return token;

    }
    async createOrder(orderpayload){
        let response ={};
        response.token = await this.getToken();
        const orderResponse = await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{data:orderpayload,
            headers:{
              'Authorization': await this.getToken(),
              'Content-Type': 'application/json'
            }
          })
          const orderResponsejson = await orderResponse.json();
          const orderID = orderResponsejson.orders[0];
          console.log(orderResponsejson.orders[0]);
          console.log(orderResponsejson.message);
          response.orderID = orderID;
          return response;
    }
}
module.exports = {APiUtils};