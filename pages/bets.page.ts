import BasePage from './base.page';

class BetsPage extends BasePage {
  private betsSection = '#bets-section';
  private footballSectionLink = 'text=Football';
  private placeBetButton = 'Place bet'; 
  private featuredSideMenu = 'text=Featured';
  private bet = 'Both teams to score'


 async isFeaturedSideMenuVisible() {
    return await this.page.isVisible(this.featuredSideMenu);
 }

  async navigateToFootballSection() {
    await this.page.click(this.footballSectionLink);
  }

  async selectFriendlyInternationalMatch() {
    return this.page.locator('a[href*="/sports/football/friendly-international"]');
  }

  async selectBothTeamsToScoreYes() {
    const parentDiv = this.page.locator('div').filter({ hasText: /^Both teams to score$/ }).locator('..')
    const yesButton = parentDiv.getByText(/^Yes/)
    await yesButton.click();
}

  async enterBetAmount(amount: number) {
    const section = this.page.getByText('Single1 bet x£');
    await section.getByText('£').click();
    await this.page.getByText(`£${amount}.00`).click();
    await this.page.getByText('Done').click();
  }

  async getTotalAmount() {
    return await this.page.getByText('Total oddsTo return').locator('..').getByText(/^£/).textContent();
  }

  async clickPlaceBetButton() {
    await this.page.getByRole('button', { name: this.placeBetButton }).click();
  }

  async insuffientSection() {
    return await this.page.getByText('Insufficient funds').isVisible();
  }
}

export default BetsPage;
