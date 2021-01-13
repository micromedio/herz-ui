const path = require("path")

// styleguide.config.js
module.exports = {
  components: "src/components/**/*.tsx",
  styleguideComponents: {
    Wrapper: path.join(__dirname, "src/styleguide/ThemeWrapper"),
  },
  propsParser: require("react-docgen-typescript").parse,
}
