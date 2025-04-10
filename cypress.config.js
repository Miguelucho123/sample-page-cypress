const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config);
  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)],
      loader: { '.feature': 'text' }
    })
  );

  return config;
}

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/mochawesomeresults",
    overwrite: false,
    html: false,
    json: true,
    charts: true,
    reportPageTitle: "Miguel Gutierrez - Cypress Automation",
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    specPattern: "cypress/e2e/**/*.feature",
    screenshotsFolder: "cypress/mochawesomeresults/screenshots",
    setupNodeEvents,
    viewportWidth: 1440,
    viewportHeight: 1080,
  },
});
