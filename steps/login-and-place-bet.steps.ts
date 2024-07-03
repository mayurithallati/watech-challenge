import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import HomePage from '../pages/home.page';
import BetsPage from '../pages/bets.page';
import ProfilePage from '../pages/profile.page';
import dotenv from 'dotenv';
import path from 'path';

const envFile = path.resolve(__dirname, '../env', `.env.${process.env.ENV || 'development'}`);
dotenv.config({ path: envFile });

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
  const loginButton = await homePage.loginButton()
  await loginButton.click();
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
  // Due to firenldy international match is not available, i am selecting any match
  await (await betsPage.selectAnyFirstMatch()).first().click();
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

When('I navigate to the profile page', async function () {
  const profilePage = new ProfilePage(this.page);
  const profileButton = await profilePage.profileButton();
  await profileButton.click();
})

Then('I should see logout button', async function () {
  const profilePage = new ProfilePage(this.page);
  const logoutButton = await profilePage.logoutButton();
  expect(logoutButton).toBeVisible();
});

When('I log out', async function () {
  const profilePage = new ProfilePage(this.page);
  const logoutButton = await profilePage.logoutButton();
  await logoutButton.click();
});

Then('I should be logged out', async function () {
  const homePage = new HomePage(this.page);
  const loginButton = await homePage.loginButton();
  await loginButton.isVisible();
});