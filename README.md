# Playwirght_demo using JavaScript
https://playwright.dev/java/docs/intro 

Playwright is a framework for Web Testing and Automation. It allows testing Chromium, Firefox and WebKit with a single API. Playwright is built to enable cross-browser web automation that is ever-green, capable, reliable and fast.

By default, Playwright runs the browsers in headless mode. To see the browser UI, pass the setHeadless(false) flag while launching the browser. You can also use slowMo to slow down execution. 
 playwright.firefox().launch(new BrowserType.LaunchOptions().setHeadless(false).setSlowMo(50));

 ![image](https://github.com/gomathi1996/Playwirght_demo/assets/30540632/6266cfa9-9c49-42dd-a0d6-57e0f5983cdd)

![image](https://github.com/gomathi1996/Playwirght_demo/assets/30540632/fb3292e3-93a5-492f-a0b8-8494daca7401)

![image](https://github.com/gomathi1996/Playwirght_demo/assets/30540632/0d211526-a1bd-41c8-9c4a-5803c5ecfca5)

![image](https://github.com/gomathi1996/Playwirght_demo/assets/30540632/d6663845-a18c-421d-99a4-62590726ab3d)

### Command to run test with custom configuration
```
  projects: [
    {
      name: "chromium",
      use: {
        browserName: "chromium",
        trace: "on",
        headless: false,
        screenshot: "on",
      },
    },

    {
      name: "firefox",
      use: { 
        browserName: "firefox",
        trace: "on",
        headless: false,
        screenshot: "on",
      },
       },
 

    {
      name: "webkit",
      use: { 
        browserName: "webkit",
        trace: "on",
        headless: false,
        screenshot: "on",
      }
       },
      
],
```
npx playwright test --config .\playwright.config1.js 

npx playwright test --config .\playwright.config1.js --project=webkit

#### Run test using tag
npx playwright test --config .\playwright.config1.js --project=chromium --grep "@web"
```
test(`@web End to End testing`, async ({ page,testDataForOrder }) => {
  .....................
}
```

#### Allure report
npm install -g allure-commandline --save-dev

npm i allure-playwright

npx playwright test --config .\playwright.config1.js --project=chromium --grep "@web" --reporter=line,allure-playwright

allure generate ./allure-results --clean

allure open ./allure-report

![alt text](image.png)

#### Configure custom script to run the test

Update the custom test in package.json

  "scripts": {
    "test": "npx playwright test Login.spec.js --headed",
    "pomwebtest": "npx playwright test --config ./playwright.config1.js --project=chromium --grep '@web' --reporter=line,allure-playwright",
    "pomtest": "npx playwright test --config ./playwright.config1.js --project=chromium"
  }
  
  Then run the following command

  npm run pomtest

  #### Jenkins Configuration

  Download jenkin war - https://www.jenkins.io/download/

  java -jar jenkins.war --httpPort=9090

  ![alt text](image-1.png)

  #### Playwright Installation

  npm install typescript --save-dev
  
  tsc demo.ts
  node demo.js 

  https://playwright.dev/docs/test-typescript
  https://playwright.dev/docs/pom