import { ComponentType, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * @name withPortal
 * @param Component
 * @param elementId
 * @description
 * HOC for rendering coming Component into createPortal
 * @link
 * React createPortal: https://react.dev/reference/react-dom/createPortal
 * Get component displayName:  https://react.dev/reference/react-dom/createPortal
 * @tutorial
 * - Wrap your component in withPortal, ex: export default withPortal(DropdownMenu, 'dropdown-menu')
 */
function withPortal<T extends {}>(Component: ComponentType<T>, elementId: string) {
  const NewComponent = (props: T) => {
    const [container, setContainer] = useState<HTMLElement | null>(null)

    useLayoutEffect(() => {
      let _container = document.getElementById(elementId)

      if (!_container) {
        _container = document.createElement('div')
        _container.setAttribute('id', elementId)
        document.body.appendChild(_container)
      }

      setContainer(_container)

      return () => _container?.remove()
    }, [])

    if (!container) return null

    return createPortal(<Component {...props} />, container)
  }

  NewComponent.displayName = `withPortal(${Component.displayName || Component.name || 'Component'})`

  return NewComponent
}

export default withPortal
