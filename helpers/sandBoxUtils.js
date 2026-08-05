export class sandBoxUtils{
    constructor(apiContext,loginPayload){
         this.apiContext = apiContext;
         this.loginpayload = loginPayload;
    }
    async getToken(){
        const loginResponse = await this.apiContext.post('https://api.eventhub.rahulshettyacademy.com/api/auth/login',
                {
                    data: this.loginpayload
                });
            const loginResponseJson = await (await loginResponse).json();
             let token = loginResponseJson.token;
            return token;
    }

}
 