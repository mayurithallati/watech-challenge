import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

const envFile = path.resolve(__dirname, 'env', `.env.${process.env.ENV || 'development'}`);
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
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'Tablet',
      use: {
        ...devices['iPad (gen 7)'],
        viewport: { width: 810, height: 1080 },
      },
    },
    {
      name: 'Mobile',
      use: {
        ...devices['iPhone 11'],
        viewport: { width: 375, height: 812 },
      },
    },
  ],
  reporter: [['list']],
});
