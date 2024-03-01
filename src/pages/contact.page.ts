import type { Page, Dialog } from  '@playwright/test';
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/en';

export class ContactPage{
    constructor(public page: Page){
    }
    async FillUpForm() {
      await this.page.waitForLoadState('networkidle') 
      await this.page.getByTestId('name').fill(faker.person.fullName());
      await this.page.getByTestId('email').fill(faker.internet.email()); 
      await this.page.getByTestId('subject').fill(faker.word.words()); 
      await this.page.getByTestId('message').fill(faker.word.words(20)); 
      await this.page.locator('[name=upload_file]').setInputFiles('./files/dummy.pdf');
      await this.page.getByTestId('submit-button').click();
      }

    
}