/** @jsxImportSource theme-ui */
import { forwardRef, useState } from "react"
import Tippy, { TippyProps } from "@tippyjs/react"

const LazyTippy = forwardRef<HTMLElement, TippyProps>(function LazyTippy(
  props: TippyProps,
  ref
) {
  const [mounted, setMounted] = useState(false)

  const lazyPlugin = {
    fn: () => ({
      onMount: () => setMounted(true),
      onHidden: () => setMounted(false),
    }),
  }

  const computedProps = { ...props }

  computedProps.plugins = [lazyPlugin, ...(props.plugins || [])]

  if (props.render) {
    computedProps.render = (...arguments_) =>
      mounted ? props.render?.(...arguments_) : ""
  } else {
    computedProps.content = mounted ? props.content : ""
  }

  return (
    <Tippy {...computedProps} ref={ref}>
      {props.children}
    </Tippy>
  )
})

export default LazyTippy
