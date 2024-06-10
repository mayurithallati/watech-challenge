import BasePage from './base.page';

class HomePage extends BasePage {
  private usernameInput = '#loginInput';
  private passwordInput = '#passwordInput';
  private submitButton = 'button[type="submit"]';
  private cookies = 'Accept All Cookies';

  async loginButton() {
    return await this.page.getByRole('button', { name: /Login/i });
  }

  async loginWithCredentials(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.submitButton);
  }

  async acceptCookies() {
    const cookiesButton = this.page.getByRole('button', { name: this.cookies });
    if (await cookiesButton.isVisible()) {
      await cookiesButton.click();
    }
  }
}

export default HomePage;
