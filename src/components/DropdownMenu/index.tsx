import React, { ReactNode } from "react"

interface Props {
  children?: ReactNode
  isOpen: boolean
}

const DropdownMenu = ({ children, isOpen }: Props) => {
  if (isOpen) return null

  return <ul className='dropdown-menu__list'>{children}</ul>
}

export default DropdownMenu
