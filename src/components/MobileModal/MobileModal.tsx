/** @jsxImportSource theme-ui */
import { get, ThemeUICSSObject } from "theme-ui"
import React, {
  ReactNode,
  TouchEvent,
  TransitionEvent,
  useCallback,
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
  backgroundStyles?: ThemeUICSSObject
  children?: ReactNode
  dismissible?: boolean
  draggable?: boolean
  modalStyles?: ThemeUICSSObject
  onClose?: () => void
  onDismiss?: () => void
  onOpen?: () => void
  open?: boolean
  overflowHeight?: number
  threshold?: number
  topSpacing?: number
}

const MobileModal = ({
  backgroundStyles,
  children,
  dismissible = false,
  draggable = false,
  modalStyles,
  onClose,
  onDismiss,
  onOpen,
  open = false,
  overflowHeight = 0,
  threshold = 0.7,
  topSpacing = 80,
}: MobileModalProps): JSX.Element => {
  const topLimit = useCallback(() => {
    if (modalRef.current) {
      const clientHeight = modalRef.current.getClientRects()[0].height
      const limitByClient = window.innerHeight - clientHeight
      return limitByClient > topSpacing ? limitByClient : topSpacing
    }
    return topSpacing
    // We need to recalculate the topLimit if the modalRef.current height changes, however modalRef.current reference will not change as it's a ref value, so the useCallback will not be re-called, so we are adding children to the dependency array to force the callback to be re-called when children changes, which would cause the modalRef.current height to change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topSpacing, children])

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
    isScrolling: boolean
    isOpen: boolean
  }>({
    isAnimating: false,
    isDragging: false,
    isScrolling: false,
    isOpen: false,
  })

  useEffect(() => {
    const bodyElement = bodyRef.current
    const bodyOverflow = bodyOverflowRef.current
    const portalElement = portalRef.current
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
    bodyElement.append(portalRef.current)
    return () => {
      bodyElement.style.overflow = bodyOverflow
      portalElement.remove()
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
    if (modalRef.current && !draggable) {
      if (!isFirstRender.current) {
        if (open) {
          modalRef.current.style.transition = `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)`
          modalRef.current.style.transform = `translateY(${topLimit()}px)`
        } else {
          modalRef.current.style.transition = `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)`
          modalRef.current.style.transform = `translateY(${
            window.innerHeight - overflowHeight
          }px)`
        }
        setSwipeState((previousState) => ({
          ...previousState,
          isAnimating:
            previousState.isAnimating || previousState.isOpen !== open,
          isOpen: open,
        }))
      } else {
        if (open) {
          modalRef.current.style.transition = `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)`
          modalRef.current.style.transform = `translateY(${topLimit()}px)`
          setSwipeState((previousState) => ({
            ...previousState,
            isAnimating: true,
            isOpen: open,
          }))
        }
        isFirstRender.current = false
      }
    }
  }, [draggable, open, overflowHeight, topLimit])

  function handleDismiss(): void {
    if (onDismiss) onDismiss()
    if (dismissible && !open) {
      setSwipeState({
        ...swipeState,
        isAnimating: true,
        isOpen: false,
      })
      /* istanbul ignore else */
      if (modalRef.current) {
        modalRef.current.style.transition = `transform  0.6s cubic-bezier(0.16, 1, 0.3, 1)`
        modalRef.current.style.transform = `translateY(${
          window.innerHeight - overflowHeight
        }px)`
      }
    }
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>): void {
    event.stopPropagation()
    if (swipeState.isScrolling) {
      setSwipeState({
        ...swipeState,
        isScrolling: false,
      })
      return
    }
    /* istanbul ignore else */
    if (modalRef.current) {
      const averageSpeed =
        (currentY.current - startY.current) /
        (endTime.current.getTime() - startTime.current.getTime())

      const translatedDiff = currentY.current - startY.current

      const thresholdInPixels = topLimit() * threshold

      const shouldTranslateUp = !swipeState.isOpen && translatedDiff < 0
      const shouldTranslateDown = swipeState.isOpen && translatedDiff > 0

      let isAnimating = true
      let isOpen = swipeState.isOpen
      if (
        (Math.abs(translatedDiff) > thresholdInPixels ||
          Math.abs(averageSpeed) > 0.5) &&
        (shouldTranslateUp || shouldTranslateDown)
      ) {
        if (shouldTranslateUp) {
          isAnimating = currentY.current - startY.current !== 0
          modalRef.current.style.transition = `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)`
          modalRef.current.style.transform = `translateY(${topLimit()}px)`
          currentY.current = topLimit()
          isOpen = true
          if (onOpen) onOpen()
        } else {
          isAnimating = currentY.current - startY.current !== 0
          modalRef.current.style.transition = `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)`
          modalRef.current.style.transform = `translateY(${
            window.innerHeight - overflowHeight
          }px)`
          currentY.current = window.innerHeight - overflowHeight
          isOpen = false
        }
      } else {
        isAnimating = currentY.current - startY.current !== 0
        modalRef.current.style.transform = `translateY(${
          swipeState.isOpen ? topLimit() : window.innerHeight - overflowHeight
        }px)`

        currentY.current = swipeState.isOpen
          ? topLimit()
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
    if (swipeState.isScrolling) return
    if (swipeState.isOpen && event.currentTarget.scrollTop !== 0) {
      setSwipeState({
        ...swipeState,
        isScrolling: true,
      })
      return
    }
    endTime.current = new Date()

    /* istanbul ignore else */
    if (modalRef.current) {
      const { clientY } = event.touches[0]
      const diff = clientY - startY.current
      const diffToTranslate =
        (swipeState.isOpen ? topLimit() : window.innerHeight - overflowHeight) +
        diff
      const shouldTranslate =
        diffToTranslate >= topLimit() &&
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

  function shouldDisplayBorders(): boolean {
    return (
      (swipeState.isOpen || open) &&
      !!modalRef.current &&
      modalRef.current.getClientRects()[0].height === window.innerHeight &&
      !topSpacing
    )
  }

  return ReactDOM.createPortal(
    <React.Fragment>
      <div
        data-testid="test-background"
        onTouchEnd={onDismiss || dismissible ? handleDismiss : undefined}
        ref={backgroundRef}
        sx={{
          "@keyframes fadeIn": {
            "0%": {
              opacity: 0,
            },
            "100%": {
              opacity: 1,
            },
          },
          "@keyframes fadeOut": {
            "0%": {
              opacity: 1,
            },
            "100%": {
              opacity: 0,
            },
          },
          animation:
            swipeState.isOpen || open || swipeState.isDragging
              ? `0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards fadeIn`
              : `0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards fadeOut`,
          backgroundColor: `text.alpha.40`,
          height: `100vh`,
          left: 0,
          position: `fixed`,
          top: 0,
          minWidth: `100vw`,
          visibility:
            swipeState.isAnimating ||
            swipeState.isDragging ||
            swipeState.isOpen ||
            open
              ? `visible`
              : `hidden`,
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
          borderRadius: shouldDisplayBorders() ? 0 : 8,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderStyle: `solid`,
          borderWidth: `1px`,
          boxShadow: `0px 1px 12px rgba(0, 0, 0, 0.04)`,
          left: 0,
          height: !topSpacing ? `100vh` : `fit-content`,
          maxHeight: `calc(100vh - ${topSpacing}px)`,
          minWidth: `100vw`,
          overflowY: swipeState.isOpen ? `auto` : `hidden`,
          padding: 8,
          paddingTop: draggable ? 0 : 9,
          position: `fixed`,
          top: 0,
          transform: `translateY(${window.innerHeight - overflowHeight}px)`,
          zIndex: 5,
          ...modalStyles,
        }}
      >
        {draggable && (
          <header
            onTouchEnd={draggable ? handleTouchEnd : undefined}
            onTouchMove={draggable ? handleTouchMove : undefined}
            onTouchStart={draggable ? handleTouchStart : undefined}
            sx={{
              backgroundColor: `#fff`,
              height: 48,
              position: `sticky`,
              top: 0,
              width: `100%`,
              zIndex: 6,
              "&::before": {
                boxSizing: `border-box`,
                border: (theme) => `2px solid ${get(theme, "colors.text.90")}`,
                borderRadius: 1,
                content: `""`,
                display: `block`,
                height: 0,
                // 84 (20px half of this component width and 64px for lateral paddings)
                left: `calc((100% - 40px) / 2)`,
                position: `relative`,
                top: 5,
                width: 40,
              },
            }}
          />
        )}
        {children}
      </div>
    </React.Fragment>,
    portalRef.current
  )
}

export default MobileModal
