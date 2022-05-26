const path = require("path");

module.exports = {
  diffOptions: { threshold: 0.02 },
  maxRetries: 2,
  screenDir: path.join(__dirname, '../tests/images'),
  browsers: {
    chrome: {
      browserName: 'chrome',
      version: '101.0',
      // Define initial viewport size
      viewport: { width: 1024, height: 768 },
      // Increase parallel sessions
      limit: 2,
    },
    firefox: {
      browserName: 'firefox',
      version: '99.0',
      viewport: { width: 1024, height: 768 },
      limit: 2,
    },
  },
}
