import { animated, config, useTransition } from "@react-spring/web"
import withPortal from "containers/withPortal"
import { ReactNode, useEffect } from "react"

interface Props {
  children?: ReactNode
  anchorEl: HTMLButtonElement | null
  isOpen: boolean
}

const DropdownMenu = ({ children, isOpen, anchorEl }: Props) => {
  const transition = useTransition(isOpen, {
    from: { opacity: 0, transform: "scale(0.8)" },
    enter: { opacity: 1, transform: "scale(1.0)" },
    leave: { opacity: 0, transform: "scale(0.8)" },
    config: config.stiff,
  })

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
        >
          {children}
        </animated.ul>
      )
  )
}

export default withPortal(DropdownMenu, "dropdown-menu")
