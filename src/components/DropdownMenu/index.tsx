import { animated, config, useTransition } from "@react-spring/web"
import withPortal from "containers/withPortal"
import { ReactNode, useEffect, useRef } from "react"

interface Props {
  children?: ReactNode
  anchorEl: HTMLElement | null
  isOpen: boolean
  handleClose: () => void
}

const DropdownMenu = ({ children, isOpen, anchorEl, handleClose }: Props) => {
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

      const menuEl = menuRef.current

      if (!menuEl || !anchorEl) return

      const composedPaths = event.composedPath()
      const isAnchorElClicked = composedPaths.includes(anchorEl)
      const isDropdownMenuElClicked = composedPaths.includes(menuEl)

      if (!isAnchorElClicked && !isDropdownMenuElClicked) handleClose()
    }

    window.addEventListener("click", handleClickOutside)

    return () => window.removeEventListener("click", handleClickOutside)
  }, [anchorEl, handleClose, isOpen])

  useEffect(() => {
    if (isOpen) {
      console.log(anchorEl?.getBoundingClientRect())
    }
  }, [anchorEl, isOpen])

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
