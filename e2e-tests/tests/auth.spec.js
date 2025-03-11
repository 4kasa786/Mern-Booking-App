"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const UI_URL = "http://localhost:5173/";
(0, test_1.test)('should allow to the user to sign in', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
    yield page.goto(UI_URL);
    // Expect a title "to contain" a substring.
    // await expect(page).toHaveTitle(/Playwright/);
    //get the sign in button
    yield page.getByRole('link', { name: 'Sign In' }).click();
    yield (0, test_1.expect)(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
    yield page.locator('[name=email]').fill('God@God.com');
    yield page.locator('[name=password]').fill('GodGod');
    yield page.getByRole('button', { name: 'Login' }).click();
    yield (0, test_1.expect)(page.getByText('Sign In successful!')).toBeVisible();
    yield (0, test_1.expect)(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
    yield (0, test_1.expect)(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
    yield (0, test_1.expect)(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
}));
// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');
//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();
//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
(0, test_1.test)('should allow the user to register', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
    const testEmail = `God${Math.floor(Math.random() * 1000)}@God.com`;
    yield page.goto(UI_URL);
    yield page.getByRole('link', { name: 'Sign In' }).click();
    yield page.getByRole('link', { name: 'Create an account here' }).click();
    yield (0, test_1.expect)(page.getByRole('heading', { name: 'Create an Account' })).toBeVisible();
    yield page.locator('[name=firstName]').fill('God2');
    yield page.locator('[name=lastName]').fill('God2');
    yield page.locator('[name=email]').fill(testEmail);
    yield page.locator('[name=password]').fill('God2God2');
    yield page.locator('[name=confirmPassword]').fill('God2God2');
    yield page.getByRole('button', { name: 'Create Account' }).click();
    yield (0, test_1.expect)(page.getByText('User Registered Successfully')).toBeVisible();
    yield (0, test_1.expect)(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
    yield (0, test_1.expect)(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
    yield (0, test_1.expect)(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
}));
