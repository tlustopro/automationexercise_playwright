import type { Page } from  '@playwright/test';
import { test, expect } from '@playwright/test';

export class HomePage{
    constructor(public page: Page){
    }
    async OpenHomepage() {
        await this.page.goto('/');
        await expect(this.page).toHaveTitle(/Automation Exercise/);
      }

      async OpenLoginPage() {
        await this.page.goto('/');
        await expect(this.page).toHaveTitle(/Automation Exercise/);
        await this.page.getByRole('link', { name: 'Signup / Login' }).click();
        await expect(this.page).toHaveTitle(/Automation Exercise - Signup/);
      }
      async OpenContactUsPage() {
        await this.page.goto('/');
        await expect(this.page).toHaveTitle(/Automation Exercise/);
        await this.page.getByRole('link', { name: 'Contact us' }).click();
        await expect(this.page).toHaveTitle(/Automation Exercise - Contact Us/);
      }
    
}