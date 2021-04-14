import { render } from "../../tests/utils"
import ListSelect from "./ListSelect"
import { axe } from "jest-axe"

const options = [
  {
    label: "Walk",
    value: "walk",
    affix: "WALK",
  },
  {
    label: "Train",
    value: "train",
    affix: "TRAIN",
  },
  {
    label: "Car",
    value: "car",
    affix: "CAR",
  },
  {
    label: "Plane",
    value: "plane",
    affix: "PLANE",
  },
]

describe("ListSelect", () => {
  test("passes a11y check", async () => {
    // Arrange
    const { container } = render(<ListSelect options={options} />)
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })
})
