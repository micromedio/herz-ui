const path = require("path");

module.exports = {
  diffOptions: { threshold: 0.005 },
  maxRetries: 2,
  screenDir: path.join(__dirname, '../tests/images'),
  browsers: {
    chrome: {
      browserName: 'chrome',
      // Define initial viewport size
      viewport: { width: 1024, height: 768 },
      // Increase parallel sessions
      limit: 2,
    },
    firefox: {
      browserName: 'firefox',
      viewport: { width: 1024, height: 768 },
      limit: 2,
    },
  },
}
