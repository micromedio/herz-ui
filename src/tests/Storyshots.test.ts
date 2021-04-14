import initStoryshots from "@storybook/addon-storyshots"
import { imageSnapshot } from "@storybook/addon-storyshots-puppeteer"
import path from "path"

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

initStoryshots({
  suite: "Image storyshots",
  test: imageSnapshot({
    async beforeScreenshot(page) {
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
    },
    storybookUrl: `file://${path.resolve(__dirname, "../../storybook-static")}`,
    getMatchOptions: () => {
      return {
        comparisonMethod: "ssim",
        failureThreshold: 0.01,
        failureThresholdType: "percent",
      }
    },
  }),
})