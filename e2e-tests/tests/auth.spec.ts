import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/";

test('should allow to the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);

  //get the sign in button


  await page.getByRole('link', { name: 'Sign In' }).click();

  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();

  await page.locator('[name=email]').fill('God@God.com');

  await page.locator('[name=password]').fill('GodGod');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Sign In successful!')).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();



});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();


// });


test('should allow the user to register', async ({ page }) => {

  const testEmail = `God${Math.floor(Math.random() * 1000)}@God.com`;

  await page.goto(UI_URL);
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Create an account here' }).click();
  await expect(page.getByRole('heading', { name: 'Create an Account' })).toBeVisible();
  await page.locator('[name=firstName]').fill('God2');
  await page.locator('[name=lastName]').fill('God2');
  await page.locator('[name=email]').fill(testEmail);
  await page.locator('[name=password]').fill('God2God2');
  await page.locator('[name=confirmPassword]').fill('God2God2');

  await page.getByRole('button', { name: 'Create Account' }).click();

  await expect(page.getByText('User Registered Successfully')).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();



})