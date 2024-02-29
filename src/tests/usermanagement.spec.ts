import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/en';
import { log } from 'console';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';

test.describe('User management', () => {
  test('TC_01_register', async ({ page }) => {
    const homepage = new HomePage(page);

    await homepage.OpenLoginPage();
    //filling up name and email for future usage and clicking on signup button
    await page.getByPlaceholder('Name').fill(faker.person.fullName()); 
    await page.getByTestId('signup-email').fill(faker.internet.email()); 
    await page.getByTestId('signup-button').click();
    //sign up form displayed
    await expect(page.getByRole('heading', { name: 'ENTER ACCOUNT INFORMATION' })).toBeVisible();
    // filling up rest of the sign up form
    await page.getByRole('radio', { name: 'Mr.' , exact:true }).click();
    await page.getByTestId('password').fill(faker.internet.password()); 
    await page.getByTestId('days').selectOption('1');
    await page.getByTestId('months').selectOption({ label: 'January' });
    await page.getByTestId('years').selectOption('2021');
    await page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
    await page.getByRole('checkbox', { name: 'Receive special offers from our partners!' }).check();
    await page.getByTestId('first_name').fill(faker.person.firstName()); 
    await page.getByTestId('last_name').fill(faker.person.lastName());
    await page.getByTestId('company').fill(faker.company.name());
    await page.getByTestId('address').fill(faker.location.street());
    await page.getByTestId('address2').fill(faker.location.streetAddress());
    await page.getByTestId('country').selectOption({ label: 'Israel' });
    await page.getByTestId('state').fill(faker.location.state());
    await page.getByTestId('city').fill(faker.location.city());
    await page.getByTestId('zipcode').fill(faker.location.zipCode());
    await page.getByTestId('mobile_number').fill(faker.phone.number());
    //Log username and password for future usage
    const username = await page.getByTestId('email').inputValue();
    const password = await page.getByTestId('password').inputValue();
    log (username, password);
    //clicking on submit button
    await page.getByTestId('create-account').click();
    //verify that success message is displayed
    await expect(page.getByRole('heading', { name: 'ACCOUNT CREATED!' })).toBeVisible();
    //click on continue button to login
    await page.getByTestId('continue-button').click();
    //verify that user is properly logged in, TODO
    //await expect(page.locator("text=modal title")).toBeVisible()

    //Delete account and verify that delete message is displayed
    await page.getByRole('link', { name: 'Delete Account' }).click();
    await expect(page.getByRole('heading', { name: 'Account Deleted!' })).toBeVisible();
    //redirect on homepage
    await page.getByTestId('continue-button').click();
    });
  test('TC_02_valid_login', async ({ page }) => {
    const login = new LoginPage(page);
    const homepage = new HomePage(page);

    await homepage.OpenLoginPage();
    await login.logIn(process.env.USERNAME!, process.env.PASSWORD!)
    await expect(page.getByRole('link', { name: 'Delete Account' })).toBeVisible();
  });
  test('TC_03_invalid_login', async ({ page }) => {
    const login = new LoginPage(page);
    const homepage = new HomePage(page);

    await homepage.OpenLoginPage();
    await login.logIn('denis@gmail.com', '123')
    await expect(page.locator("text=Your email or password is incorrect!")).toBeVisible()
  });
  test('TC_04_logout', async ({ page }) => {
    const login = new LoginPage(page);
    const homepage = new HomePage(page);

    await homepage.OpenLoginPage();
    await login.logIn(process.env.USERNAME!, process.env.PASSWORD!)
    await (page.getByRole('link', { name: 'Logout' })).click();
    await expect(page).toHaveURL('/login');
  });
  test('TC_05_register_already_used_email', async ({ page }) => {
    const login = new LoginPage(page);
    const homepage = new HomePage(page);

    await homepage.OpenLoginPage();
    await login.signUpInvalid()
    await expect(page.getByText('Email Address already exist!')).toBeVisible();
  });
});