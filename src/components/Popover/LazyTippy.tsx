/** @jsxImportSource theme-ui */
import { forwardRef, useState } from "react"
import Tippy, { TippyProps } from "@tippyjs/react"

type LazyTippyProps = TippyProps & { alwaysRenderContent?: boolean }

const LazyTippy = forwardRef<HTMLElement, LazyTippyProps>(function LazyTippy(
  props: LazyTippyProps,
  ref
) {
  const [mounted, setMounted] = useState(false)

  const lazyPlugin = {
    fn: () => ({
      onMount: () => setMounted(true),
      onHidden: () => setMounted(false),
    }),
  }

  const { alwaysRenderContent, ...computedProps } = props

  computedProps.plugins = [lazyPlugin, ...(props.plugins || [])]

  if (!alwaysRenderContent) {
    if (computedProps.render) {
      computedProps.render = (...arguments_) =>
        mounted ? computedProps.render?.(...arguments_) : ""
    } else {
      computedProps.content = mounted ? computedProps.content : ""
    }
  }

  return (
    <Tippy {...computedProps} ref={ref}>
      {computedProps.children}
    </Tippy>
  )
})

export default LazyTippy
