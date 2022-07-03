const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'dpkhqc',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  defaultCommandTimeout: 20000,
});
