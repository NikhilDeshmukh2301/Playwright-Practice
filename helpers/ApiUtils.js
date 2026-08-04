export class ApiUtils{
    constructor(apiContext,loginPayload){
         this.apiContext = apiContext;
         this.loginpayload = loginPayload;
    }
    async getToken(){
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
                {
                    data: this.loginpayload
                });
            const loginResponseJson = await (await loginResponse).json();
             let token = loginResponseJson.token;
            return token;
    }

    async placeOrder(orderPayload){
       let response = {};
       response.token = await this.getToken();
       const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
               {
                   data: orderPayload,
                   headers: {
                       Authorization: response.token,
                       contentType: 'application/json'
                   }
               });
         
           const orderResponseJson = await(await orderResponse).json();
           const orderId = orderResponseJson.orders[0];
           response.orderId = orderId;
           return response;
    }
}
 