import { Given, When, Then, setWorldConstructor, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { expect } from '@playwright/test';
import HomePage from '../pages/home.page';
import BetsPage from '../pages/bets.page';
import dotenv from 'dotenv';
import path from 'path';

const envFile = path.resolve(__dirname, '../env', `.env.${process.env.ENV || 'development'}`);
dotenv.config({ path: envFile });

setDefaultTimeout(60 * 1000);

class CustomWorld {
  browser: Browser;
  page: Page;

  async init() {
    this.browser = await chromium.launch({ headless: false });
    this.page = await this.browser.newPage();
  }

  async close() {
    await this.page.close();
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);

Before(async function () {
  await this.init();
});

Given('I navigate to the home page', async function () {
  const homePage = new HomePage(this.page);
  await homePage.navigate(`${process.env.BASE_URL}`);
});

Then('I accept all cookies', async function () {
  const homePage = new HomePage(this.page);
  await homePage.acceptCookies();
})

When('I click the login button', async function () {
  const homePage = new HomePage(this.page);
  await homePage.clickLoginButton();
});

When('I log in with my credentials', async function () {
  const homePage = new HomePage(this.page);
  await homePage.loginWithCredentials(process.env.USERNAME, process.env.PASSWORD);
});

Then('I should see the featured side menu', async function () {
  const betsPage = new BetsPage(this.page);
  const isVisible = await betsPage.isFeaturedSideMenuVisible();
  expect(isVisible).toBe(true);
});

When('I navigate to the football section', async function () {
  const betsPage = new BetsPage(this.page);
  await betsPage.navigateToFootballSection();
});

When('I select first friendly-international match', async function () {
  const betsPage = new BetsPage(this.page);
  await (await betsPage.selectFriendlyInternationalMatch()).first().click();
});

When('I should select Both teams to score Yes', async function() {
  const betsPage = new BetsPage(this.page);
  await betsPage.selectBothTeamsToScoreYes()
});


When('I enter the bet amount {string}', async function (amount: string) {
  const betsPage = new BetsPage(this.page);
  await betsPage.enterBetAmount(parseInt(amount));
});

When('I verify the bet amount', async function () {
  const betsPage = new BetsPage(this.page);
  const validAmount = await betsPage.getTotalAmount();
  expect(validAmount.length > 0 ).toBe(true);
});

When('I click the place bet button', async function () {
  const betsPage = new BetsPage(this.page);
  await betsPage.clickPlaceBetButton();
});

Then('I should see insufficient funds text', async function () {
  const betsPage = new BetsPage(this.page);
  const insufficientVisible = await betsPage.insuffientSection();
  expect(insufficientVisible).toBe(true);
});
