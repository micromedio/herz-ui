import React from "react"
import { render, fireEvent } from "@testing-library/react"
import { axe } from "jest-axe"
import Table from "./Table"

describe("Table", () => {
  const columns = [
    {
      Header: "ID",
      accessor: "id",
      highlight: true,
    },
    {
      Header: "NAME",
      accessor: "name",
    },
  ]

  const data = [
    {
      id: "1",
      name: "FIRST_TEST_NAME",
    },
    {
      id: "2",
      name: "SECOND_TEST_NAME",
    },
    {
      id: "3",
      name: "THIRD_TEST_NAME",
    },
  ]

  test("label is shown", async () => {
    // Arrange
    const { getByText } = render(<Table columns={columns} data={data} />)

    // Assert
    expect(getByText("FIRST_TEST_NAME")).toBeInTheDocument()
    expect(getByText("SECOND_TEST_NAME")).toBeInTheDocument()
    expect(getByText("THIRD_TEST_NAME")).toBeInTheDocument()
  })

  test("sorts by row on header click", async () => {
    // Arrange
    const { getAllByText, getByText } = render(
      <Table
        columns={columns}
        data={[
          {
            id: "1",
            name: "XXX_TEST_NAME",
          },
          {
            id: "2",
            name: "AAA_TEST_NAME",
          },
          {
            id: "3",
            name: "HHH_TEST_NAME",
          },
          {
            id: "4",
            name: "DDD_TEST_NAME",
          },
        ]}
      />
    )

    // sorts by name ascending
    fireEvent.click(getByText("NAME"))
    let rows = getAllByText(/.*test_name/i).map((item) => item.textContent)
    expect(rows).toMatchObject([
      "AAA_TEST_NAME",
      "DDD_TEST_NAME",
      "HHH_TEST_NAME",
      "XXX_TEST_NAME",
    ])

    // sorts by name descending
    fireEvent.click(getByText("NAME"))
    rows = getAllByText(/.*test_name/i).map((item) => item.textContent)
    expect(rows).toMatchObject([
      "XXX_TEST_NAME",
      "HHH_TEST_NAME",
      "DDD_TEST_NAME",
      "AAA_TEST_NAME",
    ])
  })

  test("shown items change on page change", async () => {
    // Arrange
    const { getByText, queryByText } = render(
      <Table
        columns={columns}
        data={Array.from({ length: 15 })
          .fill("")
          .map((_, index) => ({
            id: `ID_${index}`,
            name: `TEST_NAME_${index}`,
          }))}
        initialPageIndex={0}
        initialPageSize={5}
      />
    )

    // first page shows up
    ;[0, 1, 2, 3, 4].forEach((index) => {
      expect(getByText(`TEST_NAME_${index}`)).toBeInTheDocument()
    })
    ;[5, 6, 7, 8, 9, 10, 11, 12, 13, 14].forEach((index) => {
      expect(queryByText(`TEST_NAME_${index}`)).not.toBeInTheDocument()
    })

    // change to page 2
    fireEvent.click(getByText("2"))
    // second page shows up
    ;[5, 6, 7, 8, 9].forEach((index) => {
      expect(getByText(`TEST_NAME_${index}`)).toBeInTheDocument()
    })
    ;[0, 1, 2, 3, 4, 10, 11, 12, 13, 14].forEach((index) => {
      expect(queryByText(`TEST_NAME_${index}`)).not.toBeInTheDocument()
    })
  })

  test("passes a11y check", async () => {
    // Arrange
    const { container } = render(<Table columns={columns} data={data} />)
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })
})
