import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/en';
import { HomePage } from '../pages/home.page';
import { ContactPage } from '../pages/contact.page';
import { PlaywrightBlocker } from '@cliqz/adblocker-playwright';


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
    test('TC_07_Test_case_page', async ({ page }) => {
        const homepage = new HomePage(page);
        let blocker = await PlaywrightBlocker.fromPrebuiltAdsOnly(fetch); 

        blocker.enableBlockingInPage(page);
        await homepage.OpenHomepage();
        await page.getByRole('button', { name: 'Test Cases' }).click();
        await expect(page).toHaveTitle(/Automation Practice Website for UI Testing - Test Cases/);
      });
});