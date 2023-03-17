import DropdownMenu from "components/DropdownMenu"
import DropdownMenuItem from "components/DropdownMenu/DropdownMenuItem"
import { Fragment, useState, MouseEvent } from "react"
import {
  RxDotsVertical,
  RxExit,
  RxQuestionMarkCircled,
  RxRocket,
} from "react-icons/rx"

function App() {
  const [anchorEl, setAnchorEl] = useState<EventTarget | null>(null)
  const isOpen = Boolean(anchorEl)

  const handleClick = (event: MouseEvent) => {
    setAnchorEl(isOpen ? null : event.currentTarget)
  }

  return (
    <Fragment>
      <button className='button__icon fixed-center' onClick={handleClick}>
        <RxDotsVertical className='icon' />
      </button>
      <DropdownMenu isOpen={isOpen}>
        <DropdownMenuItem>
          <RxRocket
            style={{ fontSize: "16px", transformOrigin: "left center" }}
          />
          Get started guide
        </DropdownMenuItem>
        <DropdownMenuItem>
          <RxQuestionMarkCircled style={{ fontSize: "16px" }} />
          Help center
        </DropdownMenuItem>
        <DropdownMenuItem>
          <RxExit style={{ fontSize: "16px" }} />
          Sign out
        </DropdownMenuItem>
      </DropdownMenu>
    </Fragment>
  )
}

export default App
