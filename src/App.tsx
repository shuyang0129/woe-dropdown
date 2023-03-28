import { Fragment } from 'react'
import { RxDotsVertical, RxExit, RxQuestionMarkCircled, RxRocket } from 'react-icons/rx'

function App() {
  return (
    <Fragment>
      <button className="button__icon fixed-center">
        <RxDotsVertical className="icon" />
      </button>
      <div className="dropdown-menu__list" style={{ position: 'fixed' }}>
        <div className="dropdown-menu__item">
          <RxRocket style={{ fontSize: '16px' }} />
          Get started guide
        </div>
        <div className="dropdown-menu__item">
          <RxQuestionMarkCircled style={{ fontSize: '16px' }} />
          Help center
        </div>
        <div className="dropdown-menu__item">
          <RxExit style={{ fontSize: '16px' }} />
          Sign out
        </div>
      </div>
    </Fragment>
  )
}

export default App
