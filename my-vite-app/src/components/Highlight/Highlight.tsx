/** @jsxImportSource theme-ui */
import React, { CSSProperties, ReactNode } from "react"

export interface HighlightProps {
  /** The background color to the Highlight Component */
  backgroundColor?: CSSProperties["backgroundColor"]
  /** The Highlight Component string to be highlighted */
  search: string
  /** The Highlight Component text to be rendered */
  text: string
}

const Highlight = ({
  backgroundColor = "highlight",
  search,
  text,
}: HighlightProps) => {
  const stringMatch = text.matchAll(new RegExp(search, `gi`))
  // eslint-disable-next-line unicorn/prefer-spread
  const regExpMatchToArray = Array.from(stringMatch)
  if (!search || regExpMatchToArray.length === 0)
    return <React.Fragment>{text}</React.Fragment>
  // eslint-disable-next-line unicorn/no-array-reduce
  const matchArray = regExpMatchToArray.reduce(
    (
      accumulator: Array<ReactNode>,
      match,
      index: number,
      array
    ): Array<ReactNode> => {
      const currentIndex =
        index === 0 ? 0 : (array[index - 1].index as number) + search.length
      const offset = (match.index as number) + search.length
      if (currentIndex < (match.index as number))
        accumulator.push(text.slice(currentIndex, match.index))
      accumulator.push(
        <span
          data-testid={`highlight-span`}
          sx={{
            backgroundColor: backgroundColor,
          }}
        >
          {text.slice(match.index, offset)}
        </span>
      )
      if (index === array.length - 1)
        accumulator.push(text.slice(offset, text.length))
      return accumulator
    },
    []
  )
  return (
    <span data-testid="highlight-wrapper">
      {matchArray.map((item, index) => (
        <React.Fragment key={`highlight-${index}`}>{item}</React.Fragment>
      ))}
    </span>
  )
}

export default Highlight
