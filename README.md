# Playwright Cucumber BDD Automation Project

This project is set up to perform BDD testing using Cucumber, Playwright, and TypeScript. It tests the responsiveness of an application across mobile, tablet, and desktop devices.

## Environment Setup

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn
- Docker (optional, for running tests in Docker containers)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mayurithallati/watech-challenge.git
   cd watech-challenge
   
### Environment Files

1. There are three env files for "dev", "staging", "production", where you need to enter username password to test the https://www.virginbet.com website

### To run tests
Following this pattern you will be able to test in all devices npm run test:[ENV]:[DEVICE]
For example:
   ```bash
   npm run test:prod:desktop
   npm run test:prod:mobile
   npm run test:prod:tablet
   