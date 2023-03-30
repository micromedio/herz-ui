const path = require("path")
const { version } = require("./package.json")

module.exports = {
  assetsDir: "src/assets/",
  ignore: [
    "src/components/**/*.test.tsx",
    "src/components/**/*.stories.tsx",
    "src/components/Button/ButtonExamples.tsx",
    "src/components/EditableField/EditableField.tsx",
    "src/components/Select/SelectOption.tsx",
    "src/components/Select/SelectOptionCustom.tsx",
    "src/components/RadioGroup/RadioGroupContext.tsx",
  ],
  version: `${version}`,
  styleguideComponents: {
    Wrapper: path.join(__dirname, "src/docs/Providers"),
  },
  require: ["normalize.css"],
  propsParser: require("react-docgen-typescript").parse,
  skipComponentsWithoutExample: true,
  sections: [
    {
      name: "Introduction",
      content: "./docs/index.md",
    },
    {
      name: "Components",
      content: "./docs/components.md",
      components: "src/components/**/*.tsx",
      ignore: ["src/components/EditableField/**/*.tsx"],
      sections: [
        {
          name: "EditableField",
          components: "src/components/EditableField/**/*.tsx",
          content: "src/components/EditableField/EditableField.md",
        },
      ],
    },
  ],
  theme: {
    fontFamily: {
      base: "Gilroy",
    },
  },
  template: {
    head: {
      links: [
        {
          rel: "stylesheet",
          href: "https://cdn.micromed.health/fonts/gilroy/stylesheet.css",        },
      ],
    },
  },
}
