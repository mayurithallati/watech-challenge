import { devices } from '@playwright/test';

const desktop = {
  name: 'Desktop',
  viewport: { width: 1280, height: 720 },
};

const tablet = devices['iPad (gen 7)'];
const mobile = devices['iPhone 11'];

export { desktop, tablet, mobile };
