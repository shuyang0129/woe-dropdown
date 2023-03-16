import React, { ReactNode } from "react"

interface Props {
  children?: ReactNode
}

const DropdownMenu = ({ children }: Props) => {
  return <ul className='dropdown-menu__list'>{children}</ul>
}

export default DropdownMenu
