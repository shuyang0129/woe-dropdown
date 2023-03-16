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
      <ul className='dropdown-menu__list'>
        <li className='dropdown-menu__item'>
          <RxRocket className='icon' />
          Get started guide
        </li>
        <li className='dropdown-menu__item'>
          <RxQuestionMarkCircled className='icon' />
          Help center
        </li>
        <li className='dropdown-menu__item'>
          <RxExit className='icon' />
          Sign out
        </li>
      </ul>
    </Fragment>
  )
}

export default App
