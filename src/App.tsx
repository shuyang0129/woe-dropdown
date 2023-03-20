import DropdownMenu from 'components/DropdownMenu'
import DropdownMenuItem from 'components/DropdownMenu/DropdownMenuItem'
import { Fragment, useState, MouseEvent } from 'react'
import { RxDotsVertical, RxExit, RxQuestionMarkCircled, RxRocket } from 'react-icons/rx'

function App() {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)
  const isOpen = Boolean(anchorElement)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorElement(isOpen ? null : event.currentTarget)
  }

  const handleClose = () => setAnchorElement(null)

  return (
    <Fragment>
      <div style={{ width: '100%', height: '100vh', backgroundColor: 'transparent' }} />
      <div style={{ width: '100%', height: '100vh', backgroundColor: 'lightcyan' }} />
      <div style={{ width: '100%', height: '100vh', backgroundColor: 'lightgoldenrodyellow' }} />
      <button className="button__icon fixed-center" onClick={handleClick}>
        <RxDotsVertical className="icon" />
      </button>
      <DropdownMenu
        isOpen={isOpen}
        anchorElement={anchorElement}
        handleClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <DropdownMenuItem>
          <RxRocket style={{ fontSize: '16px' }} />
          Get started guide
        </DropdownMenuItem>
        <DropdownMenuItem>
          <RxQuestionMarkCircled style={{ fontSize: '16px' }} />
          Help center
        </DropdownMenuItem>
        <DropdownMenuItem>
          <RxExit style={{ fontSize: '16px' }} />
          Sign out
        </DropdownMenuItem>
      </DropdownMenu>
    </Fragment>
  )
}

export default App
