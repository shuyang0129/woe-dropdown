import React, { ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

const DropdownMenuItem = ({ children }: Props) => {
  return <div className="dropdown-menu__item">{children}</div>
}

export default DropdownMenuItem
