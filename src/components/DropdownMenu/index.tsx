import { animated, config, useTransition } from '@react-spring/web'
import withPortal from 'containers/withPortal'
import { CSSProperties, ReactNode, useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { debounce } from 'utils/debounce'

interface Props {
  children?: ReactNode
  anchorElement: HTMLElement | null
  isOpen: boolean
  handleClose: () => void
  anchorOrigin?: Origin
  transformOrigin?: Origin
  sx?: CSSProperties
  disableScrollLock?: boolean
}

interface Origin {
  vertical: 'top' | 'center' | 'bottom' | number
  horizontal: 'left' | 'center' | 'right' | number
}

const getOffsetLeft = (element: HTMLElement, origin: Origin['horizontal']) => {
  const width = element.offsetWidth
  if (typeof origin === 'number') return origin
  if (origin === 'right') return width
  if (origin === 'center') return width / 2
  return 0
}

const getOffsetTop = (element: HTMLElement, origin: Origin['vertical']) => {
  const height = element.offsetHeight
  if (typeof origin === 'number') return origin
  if (origin === 'bottom') return height
  if (origin === 'center') return height / 2
  return 0
}

const getTransformOrigin = (transformOrigin: Origin) => {
  return [transformOrigin.horizontal, transformOrigin.vertical]
    .map(value => (typeof value === 'number' ? `${value}px` : value))
    .join(' ')
}

const DropdownMenu = ({
  children,
  isOpen,
  anchorElement,
  handleClose,
  anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
  transformOrigin = { vertical: 'top', horizontal: 'left' },
  sx = {},
  disableScrollLock = false,
}: Props) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const transition = useTransition(isOpen, {
    from: { opacity: 0, transform: 'scale(0.8)' },
    enter: { opacity: 1, transform: 'scale(1.0)' },
    leave: { opacity: 0, transform: 'scale(0.8)' },
    config: config.stiff,
  })

  // prevent scroll when dropdown menu is open
  useEffect(() => {
    if (disableScrollLock) return

    const htmlElement = document.documentElement

    if (isOpen) htmlElement.style.overflow = 'hidden'

    return () => {
      htmlElement.style.overflow = 'auto'
    }
  }, [disableScrollLock, isOpen])

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

    window.addEventListener('click', handleClickOutside)
    return () => window.removeEventListener('click', handleClickOutside)
  }, [anchorElement, handleClose, isOpen])

  const getPosition = useCallback(() => {
    const menuElement = menuRef.current
    if (!anchorElement || !menuElement) return

    const { top, left } = anchorElement.getBoundingClientRect()

    const anchorOffsetLeft = getOffsetLeft(anchorElement, anchorOrigin.horizontal)
    const anchorOffsetTop = getOffsetTop(anchorElement, anchorOrigin.vertical)

    const transformOffsetX = getOffsetLeft(menuElement, transformOrigin.horizontal)
    const transformOffsetY = getOffsetTop(menuElement, transformOrigin.vertical)

    return {
      top: `${top + anchorOffsetTop - transformOffsetY}px`,
      left: `${left + anchorOffsetLeft - transformOffsetX}px`,
    }
  }, [
    anchorElement,
    anchorOrigin.horizontal,
    anchorOrigin.vertical,
    transformOrigin.horizontal,
    transformOrigin.vertical,
  ])

  const setPosition = useCallback(() => {
    if (!anchorElement || !menuRef.current) return

    const position = getPosition()

    if (!!position) {
      const { top, left } = position
      menuRef.current.style.top = top
      menuRef.current.style.left = left
    }
  }, [anchorElement, getPosition])

  useLayoutEffect(() => {
    if (isOpen) setPosition()
  }, [anchorElement, isOpen, setPosition])

  useEffect(() => {
    const handleResize = debounce(setPosition)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setPosition])

  return transition(
    (animation, item) =>
      item && (
        <animated.div
          className="dropdown-menu__list"
          style={{
            position: 'fixed',
            transformOrigin: getTransformOrigin(transformOrigin),
            ...sx,
            ...animation,
          }}
          ref={menuRef}
        >
          {children}
        </animated.div>
      ),
  )
}

export default withPortal(DropdownMenu, 'dropdown-menu')
