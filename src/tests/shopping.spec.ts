import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/en';
import { log } from 'console';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { ContactPage } from '../pages/contact.page';

test.describe('Shopping test cases', () => {
    test('TC_06_Contact_us_form', async ({ page }) => {
    const homepage = new HomePage(page);
    const contact = new ContactPage(page);

    await homepage.OpenContactUsPage();
    await contact.FillUpForm();
    // accepting dialog using dialog handler TODO: FIX
    page.on('dialog', dialog => {
        dialog.accept();
    }); 
    await expect(page.locator("text=Success! Your details have been submitted successfully.")).toBeVisible()
    await page.getByRole('button', { name: 'Home' }).click();
    await expect(page).toHaveURL('/');
    });
});