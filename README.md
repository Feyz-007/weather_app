# Weather App

A Node.js application that provides weather information for a given city using the OpenWeatherMap API. This project includes a CI/CD pipeline configured with GitHub Actions for automated testing and deployment using Railway.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Running the Application Locally](#running-the-application-locally)
- [Running Tests](#running-tests)
- [CI/CD Pipeline](#cicd-pipeline)
- [Deploying to Railway](#deploying-to-railway)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Features

- **Homepage (`/`)**: Displays a welcome message.
- **Weather Endpoint (`/weather`)**: Returns weather data for a specified city.

## Prerequisites

1. **Node.js**: Version 18 or later.
2. **NPM**: Comes with Node.js.
3. **Railway CLI**: For deployment to Railway.
4. **GitHub Account**: For hosting the repository and setting up GitHub Actions.

## Setup Instructions

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

### 2. Install Dependencies

Install the required Node.js packages:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory of the project and add your OpenWeatherMap API key:

```plaintext
WEATHER_API_KEY=your_openweathermap_api_key
```

### 4. Verify Environment Variables in Railway

If deploying to Railway, make sure to set the `WEATHER_API_KEY` environment variable in Railway's environment settings:

- Go to the Railway dashboard.
- Select your project.
- Navigate to **Settings** > **Variables**.
- Add `WEATHER_API_KEY` with your OpenWeatherMap API key.

## Running the Application Locally

Start the application locally:

```bash
npm start
```

Open your browser and navigate to `http://localhost:3000` to see the welcome message. Test the `/weather` endpoint by visiting `http://localhost:3000/weather?city=London`.

## Running Tests

Run the test suite using Jest:

```bash
npm test
```

Jest will run the tests defined in the `tests` directory and output the results.

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment. The pipeline is defined in `.github/workflows/ci.yml`.

### GitHub Actions Workflow

The workflow includes steps for:

1. **Installing Dependencies**: Uses `npm ci` for a clean install.
2. **Running Tests**: Executes `npm test` to ensure code quality.
3. **Deploying to Railway**: Uses `railway up` to deploy the application.

### Workflow File (`.github/workflows/ci.yml`)

Here's an example `ci.yml` file:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install Dependencies
      run: npm ci

    - name: Run Tests
      run: npm test
      env:
        WEATHER_API_KEY: ${{ secrets.WEATHER_API_KEY }}

    - name: Install Railway CLI
      run: npm install -g @railway/cli

    - name: Deploy to Railway
      run: railway up --service your-service-name
      env:
        RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
        WEATHER_API_KEY: ${{ secrets.WEATHER_API_KEY }}
        RAILWAY_PROJECT_ID: ${{ secrets.RAILWAY_PROJECT_ID }}
```

## Deploying to Railway

### 1. Install Railway CLI

Install the Railway CLI globally:

```bash
npm install -g @railway/cli
```

### 2. Log In to Railway

Authenticate with Railway:

```bash
railway login
```

### 3. Deploy the Application

Deploy your application:

```bash
railway up --service your-service-name
```

Replace `your-service-name` with the name of your Railway service.

## Troubleshooting

- **Deployment Issues**: Check the Railway dashboard for logs and deployment status.
- **Test Failures**: Review test logs in GitHub Actions to identify and fix issues.
- **Environment Variables**: Ensure that all necessary environment variables are set correctly in both local and Railway environments.

**Note:** Replace placeholders like `your_openweathermap_api_key`, `your-service-name`, and repository URL with actual values relevant to your setup.
