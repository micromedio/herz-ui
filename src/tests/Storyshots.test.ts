import initStoryshots from "@storybook/addon-storyshots"
import { imageSnapshot } from "@storybook/addon-storyshots-puppeteer"
import path from "path"

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const fullPageComponents = [
  "FloatingCard",
  "MobileModal",
  "Popover",
  "DesktopModal",
  "Selector",
  "Tooltip",
]

initStoryshots({
  suite: "Image storyshots",
  test: imageSnapshot({
    async beforeScreenshot(page, options) {
      // disable animations and wait 1000ms for any transitions that already started to settle
      page.evaluate(() => {
        const css = `
        * {
          transition-duration: 0ms !important;
          animation: none !important;
        }
        `
        const style = document.createElement("style")
        document.head.append(style)
        style.append(document.createTextNode(css))
      })
      await delay(1000)

      for (const componentName of fullPageComponents) {
        if (options.context.kind.startsWith(`Design System/${componentName}`)) {
          return
        }
      }

      const element = await page.$("#root > *")
      if (element) return element
    },
    getScreenshotOptions: (options) => {
      for (const componentName of fullPageComponents) {
        if (options.context.kind.startsWith(`Design System/${componentName}`)) {
          return {
            fullPage: true,
          }
        }
      }
      return {
        fullPage: false,
      }
    },
    storybookUrl: `file://${path.resolve(__dirname, "../../storybook-static")}`,
    getMatchOptions: ({ context }) => {
      const fileName: string = context.parameters.fileName
      const storyPath = fileName.split("/").slice(0, -1).join("/")

      return {
        comparisonMethod: "ssim",
        failureThreshold: 0.01,
        failureThresholdType: "percent",
        customDiffDir: path.resolve(
          __dirname,
          "..",
          storyPath,
          "__image_snapshots__",
          "__diff_output__"
        ),
        customSnapshotsDir: path.resolve(
          __dirname,
          "..",
          storyPath,
          "__image_snapshots__"
        ),
        customSnapshotIdentifier: context.story,
      }
    },
  }),
})
