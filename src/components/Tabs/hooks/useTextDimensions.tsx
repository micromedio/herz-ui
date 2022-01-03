import { useMemo } from "react"

export const useTextDimensions = (
  tagName: string,
  innerHTML: string,
  styles: string
) => {
  const dimensions = useMemo(() => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("visibility", "hidden")
    svg.setAttribute("style", "position: fixed;")
    document.body.append(svg)
    const text = document.createElementNS("http://www.w3.org/2000/svg", tagName)
    text.setAttribute("style", styles)
    text.setAttribute("visibility", "hidden")
    text.innerHTML = innerHTML
    svg.append(text)
    const { height, width } = text.getBoundingClientRect()
    text.remove()
    svg.remove()
    return {
      height,
      width,
    }
  }, [innerHTML, styles, tagName])
  return dimensions
}
