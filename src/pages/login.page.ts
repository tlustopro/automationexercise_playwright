import type { Page } from  '@playwright/test';

export class LoginPage{
    constructor(public page: Page){

    }
    async enterLoginEmail(email:string){
        await this.page.getByTestId('login-email').fill(email);  
    }

    async enterLoginPassword(password:string){
        await this.page.getByTestId('login-password').fill(password);  
    }

    async clickLoginButton(){
        await this.page.getByTestId('login-button').click(); 
        }
    
    async enterSignupName(name:string){
        await this.page.getByPlaceholder('Name').fill(name);  
        }
    
    async enterSignupEmail(email:string){
        await this.page.getByTestId('signup-email').fill(email);  
        }
    
    async clickSignUpButton(){
        await this.page.getByTestId('signup-button').click(); 
        }
}