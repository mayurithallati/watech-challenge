import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

const envFile = path.resolve(__dirname + '/env/', `.env.${process.env.ENV || 'development'}`);
dotenv.config({ path: envFile });

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: process.env.BASE_URL,
    headless: false,
    actionTimeout: 0,
  },
  projects: [
    {
      name: 'Desktop',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'Tablet',
      use: {
        ...devices['iPad (gen 7)'],
      },
    },
    {
      name: 'Mobile',
      use: {
        ...devices['iPhone 11'],
      },
    },
  ],
  reporter: [['list']],
});
