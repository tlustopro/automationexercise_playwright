import type { Page } from  '@playwright/test';
import { faker } from '@faker-js/faker/locale/en';

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
    async logIn(email:string, password:string){
        await this.page.getByTestId('login-email').fill(email);
        await this.page.getByTestId('login-password').fill(password);  
        await this.page.getByTestId('login-button').click(); 
        }
    async signUpInvalid(){
        await this.page.getByPlaceholder('Name').fill(faker.person.fullName());
        await this.page.getByTestId('signup-email').fill(process.env.USERNAME!);  
        await this.page.getByTestId('signup-button').click(); 
        }
}