import React, { ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

const DropdownMenuItem = ({ children }: Props) => {
  return <li className="dropdown-menu__item">{children}</li>
}

export default DropdownMenuItem
