const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents (on, config) {
      // implement node event listeners here
    }
  },
  env: {
    baseUrl: 'http://localhost:3000'
  },
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack'
    }
  }
})
