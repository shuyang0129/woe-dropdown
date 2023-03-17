import { animated, config, useTransition } from "@react-spring/web"
import React, { ReactNode } from "react"

interface Props {
  children?: ReactNode
  isOpen: boolean
}

const DropdownMenu = ({ children, isOpen }: Props) => {
  const transition = useTransition(isOpen, {
    from: { opacity: 0, transform: "scale(0.8)" },
    enter: { opacity: 1, transform: "scale(1.0)" },
    leave: { opacity: 0, transform: "scale(0.8)" },
    config: config.stiff,
  })

  return transition(
    ({ opacity, transform }, item) =>
      item && (
        <animated.ul
          className='dropdown-menu__list'
          style={{
            opacity,
            transform,
          }}
        >
          {children}
        </animated.ul>
      )
  )
}

export default DropdownMenu
