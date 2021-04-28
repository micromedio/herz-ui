/** @jsxRuntime classic /
/** @jsx jsx */
import { jsx, SxStyleProp } from "theme-ui"
import React, {
  ReactNode,
  TouchEvent,
  TransitionEvent,
  useEffect,
  useRef,
  useState,
} from "react"
import ReactDOM from "react-dom"

enum MobileModalTypes {
  WITH_OVERFLOW = "overflow-herz-mobile-modal",
  WITHOUT_OVERFLOW = "herz-mobile-modal",
}

export interface MobileModalProps {
  backgroundStyles?: SxStyleProp
  children?: ReactNode
  dismissible?: (() => void) | boolean
  draggable?: boolean
  modalStyles?: SxStyleProp
  onClose?: () => void
  onOpen?: () => void
  open?: boolean
  overflowHeight?: number
  threshold?: number
  topSpacing?: number
}

export default function MobileModal({
  backgroundStyles,
  children,
  dismissible = false,
  draggable = false,
  modalStyles,
  onClose,
  onOpen,
  open = false,
  overflowHeight = 0,
  threshold = 0.7,
  topSpacing = 0,
}: MobileModalProps) {
  const bodyRef = useRef<HTMLBodyElement>(
    document.querySelector(`body`) as HTMLBodyElement
  )
  const bodyOverflowRef = useRef<string>(bodyRef.current.style.overflow)
  const portalRef = useRef<HTMLDivElement>(document.createElement(`div`))

  const backgroundRef = useRef<HTMLDivElement>(null)
  const currentY = useRef<number>(0)
  const endTime = useRef<Date>(new Date())
  const isFirstRender = useRef<boolean>(true)
  const modalRef = useRef<HTMLDivElement>(null)
  const startTime = useRef<Date>(new Date())
  const startY = useRef<number>(0)

  const [swipeState, setSwipeState] = useState<{
    isAnimating: boolean
    isDragging: boolean
    isOpen: boolean
  }>({
    isAnimating: false,
    isDragging: false,
    isOpen: false,
  })

  useEffect(() => {
    const modalElements = document.querySelectorAll(
      `body > div[data-divtype="${MobileModalTypes.WITH_OVERFLOW}"]`
    )
    if (modalElements.length > 0 && overflowHeight) {
      console.warn(
        `You are using another mobile modal with overflowHeight different from 0. You must control which one is rendered to avoid covering one with the another.`
      )
    }
    portalRef.current.setAttribute(`role`, `presentation`)
    portalRef.current.setAttribute(
      `data-divtype`,
      overflowHeight
        ? MobileModalTypes.WITH_OVERFLOW
        : MobileModalTypes.WITHOUT_OVERFLOW
    )
    Object.assign(portalRef.current.style, {
      backgroundColor: `transparent`,
      left: `0`,
      position: `fixed`,
      top: `0`,
      zIndex: `1300`,
    })
    const body = document.querySelector(`body`) as HTMLBodyElement
    body.append(portalRef.current)
    return () => {
      bodyRef.current.style.overflow = bodyOverflowRef.current
      portalRef.current.remove()
    }
  }, [overflowHeight])

  useEffect(() => {
    if (swipeState.isOpen) {
      bodyRef.current.style.overflow = `hidden`
    } else {
      bodyRef.current.style.overflow = bodyOverflowRef.current
    }
  }, [draggable, swipeState.isOpen])

  useEffect(() => {
    if (modalRef.current && !isFirstRender.current) {
      if (open) {
        modalRef.current.style.transition = `transform 0.6s ease-in-out`
        modalRef.current.style.transform = `translateY(${topSpacing}px)`
      } else {
        modalRef.current.style.transition = `transform 0.6s ease-in-out`
        modalRef.current.style.transform = `translateY(${
          window.innerHeight - overflowHeight
        }px)`
      }
      setSwipeState((previousState) => ({
        ...previousState,
        isAnimating: previousState.isAnimating || previousState.isOpen !== open,
        isOpen: open,
      }))
    } else {
      if (modalRef.current && open) {
        modalRef.current.style.transition = `transform 0.6s ease-in-out`
        modalRef.current.style.transform = `translateY(${topSpacing}px)`
        setSwipeState((previousState) => ({
          ...previousState,
          isAnimating: true,
          isOpen: open,
        }))
      }
      isFirstRender.current = false
    }
  }, [topSpacing, open, overflowHeight])

  function handleDismiss(): void {
    if (dismissible instanceof Function) {
      dismissible()
    } else if (dismissible) {
      setSwipeState({
        ...swipeState,
        isAnimating: true,
        isOpen: false,
      })
      /* istanbul ignore else */
      if (modalRef.current) {
        modalRef.current.style.transition = `transform 0.4s`
        modalRef.current.style.transform = `translateY(${
          window.innerHeight - overflowHeight
        }px)`
      }
    }
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>): void {
    event.stopPropagation()
    const averageSpeed =
      (currentY.current - startY.current) /
      (endTime.current.getTime() - startTime.current.getTime())

    const openFraction =
      (window.innerHeight - currentY.current) / window.innerHeight

    /* istanbul ignore else */
    if (modalRef.current) {
      let isAnimating = true
      let isOpen = swipeState.isOpen
      if (
        !swipeState.isOpen &&
        (openFraction > threshold || averageSpeed < -0.5)
      ) {
        isAnimating = currentY.current - startY.current !== 0
        modalRef.current.style.transition = `transform 0.4s`
        modalRef.current.style.transform = `translateY(${topSpacing}px)`
        currentY.current = topSpacing
        isOpen = true
        if (onOpen) onOpen()
      } else if (
        swipeState.isOpen &&
        (openFraction < 1 - threshold || averageSpeed > 0.5)
      ) {
        isAnimating = currentY.current - startY.current !== 0
        modalRef.current.style.transition = `transform 0.4s`
        modalRef.current.style.transform = `translateY(${
          window.innerHeight - overflowHeight
        }px)`
        currentY.current = window.innerHeight - overflowHeight
        isOpen = false
      } else {
        isAnimating = currentY.current - startY.current !== 0
        modalRef.current.style.transition = `transform 0.4s`
        modalRef.current.style.transform = `translateY(${
          swipeState.isOpen ? topSpacing : window.innerHeight - overflowHeight
        }px)`
        currentY.current = swipeState.isOpen
          ? topSpacing
          : window.innerHeight - overflowHeight
      }
      setSwipeState({
        ...swipeState,
        isAnimating,
        isDragging: false,
        isOpen,
      })
    }
  }

  function handleTouchMove(event: TouchEvent<HTMLDivElement>): void {
    event.stopPropagation()
    endTime.current = new Date()

    /* istanbul ignore else */
    if (modalRef.current) {
      const { clientY } = event.touches[0]
      const diff = clientY - startY.current
      const diffToTranslate =
        (swipeState.isOpen ? topSpacing : window.innerHeight - overflowHeight) +
        diff
      const shouldTranslate =
        diffToTranslate >= topSpacing &&
        diffToTranslate <= window.innerHeight - overflowHeight
      if (shouldTranslate)
        modalRef.current.style.transform = `translateY(${diffToTranslate}px)`
      currentY.current = clientY
    }
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>): void {
    event.stopPropagation()
    bodyRef.current.style.overflow = `hidden`
    const { clientY } = event.touches[0]
    currentY.current = clientY
    startTime.current = new Date()
    startY.current = clientY

    setSwipeState({
      ...swipeState,
      isDragging: true,
    })
  }

  function handleTransitionEnd(event: TransitionEvent<HTMLDivElement>): void {
    if (event.target === modalRef.current) {
      if (modalRef.current && draggable)
        modalRef.current.style.transition = `none`
      setSwipeState({
        ...swipeState,
        isAnimating: false,
      })
      if (!swipeState.isOpen && onClose) onClose()
    }
  }

  return ReactDOM.createPortal(
    <React.Fragment>
      <div
        data-testid="test-background"
        onTouchEnd={handleDismiss}
        ref={backgroundRef}
        sx={{
          backgroundColor: `text.0`,
          display:
            swipeState.isAnimating ||
            swipeState.isDragging ||
            swipeState.isOpen ||
            open
              ? `block`
              : `none`,
          height: `100vh`,
          left: 0,
          // Computed opacity to match our text.40
          opacity: 0.6017699115044248,
          position: `fixed`,
          top: 0,
          minWidth: `100vw`,
          zIndex: 4,
          ...backgroundStyles,
        }}
      />
      {!overflowHeight && draggable && (
        <div
          data-testid="test-expand-touch-area"
          id="extends-touch-area"
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
          onTransitionEnd={handleTransitionEnd}
          sx={{
            background: `transparent`,
            bottom: 0,
            height: `${overflowHeight + 32}px`,
            left: 0,
            position: `fixed`,
            width: `100vw`,
            zIndex: -1,
          }}
        />
      )}
      <div
        data-testid="test-modal"
        onTouchEnd={draggable ? handleTouchEnd : undefined}
        onTouchMove={draggable ? handleTouchMove : undefined}
        onTouchStart={draggable ? handleTouchStart : undefined}
        onTransitionEnd={handleTransitionEnd}
        ref={modalRef}
        sx={{
          backgroundColor: `#fff`,
          borderColor: `text.90`,
          borderRadius: (swipeState.isOpen || open) && !topSpacing ? 0 : 8,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderStyle: `solid`,
          borderWidth: `1px`,
          boxShadow: `0px 1px 12px rgba(0, 0, 0, 0.04)`,
          left: 0,
          minHeight: window.innerHeight - topSpacing + 1,
          minWidth: `100vw`,
          overflowY: `scroll`,
          padding: 8,
          paddingTop: 4,
          paddingBottom: 0,
          position: `fixed`,
          top: 0,
          transform: `translateY(${window.innerHeight - overflowHeight}px)`,
          zIndex: 5,
          ...modalStyles,
        }}
      >
        {children}
      </div>
    </React.Fragment>,
    portalRef.current
  )
}
