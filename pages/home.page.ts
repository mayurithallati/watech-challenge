import BasePage from './base.page';

class HomePage extends BasePage {
  private loginButton = 'button[aria-label="Login"]';
  private usernameInput = '#loginInput';
  private passwordInput = '#passwordInput';
  private submitButton = 'button[type="submit"]';
  private cookies = 'Accept All Cookies';

  async clickLoginButton() {
    await this.page.getByRole('button', { name: /Login/i }).click();
  }

  async loginWithCredentials(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.submitButton);
  }

  async acceptCookies() {
    await this.page.getByRole('button', { name: this.cookies }).click();
  }
}

export default HomePage;
