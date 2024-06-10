import { Before, After, AfterAll, setDefaultTimeout, setWorldConstructor, IWorld } from '@cucumber/cucumber';
import { ICreateAttachment, ICreateLog } from '@cucumber/cucumber/lib/runtime/attachment_manager';
import { chromium, Browser, Page, devices, webkit, BrowserContextOptions } from 'playwright';

setDefaultTimeout(60 * 1000);

class CustomWorld {
  browser: Browser;
  page: Page;
  parameters: any;

  constructor({ parameters }) {
    this.parameters = parameters;
  }

  async init() {
    const deviceType = this.parameters.device;
    let device = null;
    let browserType = chromium; // default to chromium

    switch (deviceType) {
      case 'Desktop':
        // No device options needed for Desktop
        break;
      case 'Mobile':
        device = devices['Pixel 5'];
        break;
      case 'Tablet':
        device = devices['iPad Air'];
        browserType = webkit; // example using webkit for iPad
        break;
      default:
        throw new Error(`Unknown device type: ${deviceType}`);
    }

    this.browser = await browserType.launch({ headless: false });
    const contextOptions: BrowserContextOptions = device ? { ...device } : {};
    const context = await this.browser.newContext(contextOptions);
    this.page = await context.newPage();
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

After(async function () {
    await this.close();
});
