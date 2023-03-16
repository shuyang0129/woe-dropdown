import DropdownMenu from "components/DropdownMenu"
import DropdownMenuItem from "components/DropdownMenu/DropdownMenuItem"
import React, { Fragment } from "react"
import {
  RxDotsVertical,
  RxExit,
  RxQuestionMarkCircled,
  RxRocket,
} from "react-icons/rx"

function App() {
  return (
    <Fragment>
      <button className='button__icon fixed-center'>
        <RxDotsVertical className='icon' />
      </button>
      <DropdownMenu>
        <DropdownMenuItem>
          <RxRocket style={{ fontSize: "16px" }} />
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
