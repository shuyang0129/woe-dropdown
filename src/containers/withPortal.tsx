import { ComponentType } from "react"
import { createPortal } from "react-dom"

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
 * - Go to index.html and create a new div with id and set to elementId, ex: <div id="dropdown-menu" />
 */
function withPortal<T extends {}>(
  Component: ComponentType<T>,
  elementId: string
) {
  const NewComponent = (props: T) => {
    return createPortal(
      <Component {...props} />,
      document.getElementById(elementId)!
    )
  }

  NewComponent.displayName = `withPortal(${
    Component.displayName || Component.name || "Component"
  })`

  return NewComponent
}

export default withPortal
