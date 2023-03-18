import { animated, config, useTransition } from "@react-spring/web"
import withPortal from "containers/withPortal"
import {
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react"

interface Props {
  children?: ReactNode
  anchorElement: HTMLElement | null
  isOpen: boolean
  handleClose: () => void
  anchorOrigin?: AnchorOrigin
}

interface AnchorOrigin {
  vertical: "top" | "center" | "bottom"
  horizontal: "left" | "center" | "right"
}

const getOffsetX = (
  element: HTMLElement,
  origin: AnchorOrigin["horizontal"]
) => {
  const { width } = element.getBoundingClientRect()
  if (origin === "right") return width
  if (origin === "center") return width / 2
  return 0
}

const getOffsetY = (element: HTMLElement, origin: AnchorOrigin["vertical"]) => {
  const { height } = element.getBoundingClientRect()
  if (origin === "bottom") return height
  if (origin === "center") return height / 2
  return 0
}

const DropdownMenu = ({
  children,
  isOpen,
  anchorElement,
  handleClose,
  anchorOrigin = { vertical: "bottom", horizontal: "left" },
}: Props) => {
  const menuRef = useRef<HTMLUListElement>(null)
  const transition = useTransition(isOpen, {
    from: { opacity: 0, transform: "scale(0.8)" },
    enter: { opacity: 1, transform: "scale(1.0)" },
    leave: { opacity: 0, transform: "scale(0.8)" },
    config: config.stiff,
  })

  // handle close when clicking outside of dropdown menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isOpen) return

      const menuElement = menuRef.current

      if (!menuElement || !anchorElement) return

      const composedPaths = event.composedPath()
      const isAnchorElementClicked = composedPaths.includes(anchorElement)
      const isMenuElementClicked = composedPaths.includes(menuElement)

      if (!isAnchorElementClicked && !isMenuElementClicked) handleClose()
    }

    window.addEventListener("click", handleClickOutside)

    return () => window.removeEventListener("click", handleClickOutside)
  }, [anchorElement, handleClose, isOpen])

  const getPosition = useCallback(() => {
    if (!anchorElement) return

    const { top, left } = anchorElement.getBoundingClientRect()
    const offsetX = getOffsetX(anchorElement, anchorOrigin.horizontal)
    const offsetY = getOffsetY(anchorElement, anchorOrigin.vertical)

    return { top: `${top + offsetY}px`, left: `${left + offsetX}px` }
  }, [anchorElement, anchorOrigin.horizontal, anchorOrigin.vertical])

  const setPosition = useCallback(() => {
    if (!anchorElement || !menuRef.current) return

    const position = getPosition()

    if (!!position) {
      const { top, left } = position
      menuRef.current.style.top = top
      menuRef.current.style.left = left
    }
  }, [anchorElement, getPosition])

  useLayoutEffect(() => {
    if (isOpen) {
      console.log("useLayoutEffect")
      setPosition()
    }
  }, [anchorElement, isOpen, setPosition])

  return transition(
    ({ opacity, transform }, item) =>
      item && (
        <animated.ul
          className='dropdown-menu__list'
          style={{
            opacity,
            transform,
            position: "fixed",
            top: 466.5 + 36,
            left: 321 + 36,
          }}
          ref={menuRef}
        >
          {children}
        </animated.ul>
      )
  )
}

export default withPortal(DropdownMenu, "dropdown-menu")
