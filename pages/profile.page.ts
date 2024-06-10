import BasePage from './base.page';

class ProfilePage extends BasePage {
  private profileId = '#depositButton';

  async profileButton() {
    return await this.page.locator(this.profileId)
  }

  async logoutButton() {
    return await this.page.getByRole('button', { name: /Log out/i })
  }
}

export default ProfilePage;
