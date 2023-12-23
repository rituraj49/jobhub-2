import React from 'react'
import Wrapper from '../assets/wrappers/SmallSidebar'
import { FaTimes } from 'react-icons/fa'
import Logo from './Logo'
import { useAppContext } from '../context/appContext'
import NavLinks from './NavLinks'

function SmallSidebar() {
  const { showSidebar, toggleSidebar } = useAppContext();
  return (
    <Wrapper>
      {
        showSidebar &&
        <div className="sidebar-container show-sidebar">
          <div className="content">
            <button
              className="close-btn"
              type='button'
              onClick={() => toggleSidebar()}
            >
              <FaTimes />
            </button>
            <header>
              <Logo />
            </header>
            <NavLinks toggleSidebar={toggleSidebar}/>
          </div>
        </div>
      }
    </Wrapper>
  )
}

export default SmallSidebar