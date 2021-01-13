const path = require("path")

module.exports = {
  components: "src/components/**/*.tsx",
  styleguideComponents: {
    Wrapper: path.join(__dirname, "src/styleguide/ThemeWrapper"),
  },
  propsParser: require("react-docgen-typescript").parse,
}
