import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/en';
import { log } from 'console';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { ContactPage } from '../pages/contact.page';

test.describe('Shopping test cases', () => {
    test('TC_06_Contact_us_form', async ({ page }) => {
        const contact = new ContactPage(page);

        await page.goto('/contact_us');
        page.on('dialog', async (dialog) => {
          await dialog.accept();
        });
        await contact.FillUpForm();
        await expect(
          page.locator('#contact-page').getByText('Success! Your details have')
        ).toBeVisible();
        page.getByRole('link', { name: ' Home' }) 
      });
});