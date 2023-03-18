import { animated, config, useTransition } from "@react-spring/web"
import withPortal from "containers/withPortal"
import { ReactNode, useEffect, useLayoutEffect, useRef } from "react"

interface Props {
  children?: ReactNode
  anchorElement: HTMLElement | null
  isOpen: boolean
  handleClose: () => void
}

const getPosition = (element: HTMLElement) => {
  const { top, left, width, height } = element.getBoundingClientRect()
  return { top: `${top + height}px`, left: `${left + width}px` }
}

const setPosition = (
  anchorElement?: HTMLElement | null,
  positionedElement?: HTMLElement | null
) => {
  if (!anchorElement || !positionedElement) return

  const { top, left } = getPosition(anchorElement)

  positionedElement.style.top = top
  positionedElement.style.left = left
}

const DropdownMenu = ({
  children,
  isOpen,
  anchorElement,
  handleClose,
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

  useLayoutEffect(() => {
    if (isOpen) setPosition(anchorElement, menuRef.current)
  }, [anchorElement, isOpen])

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
