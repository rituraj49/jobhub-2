import React from 'react'
import Wrapper from '../assets/wrappers/BigSidebar'
import NavLinks from './NavLinks';
import Logo from './Logo';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

function BigSidebar() {
  const { showSidebar, toggleSidebar } = useAppContext();
  return (
    <Wrapper>
      {
        // showSidebar &&
      <div className={showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'}>
        <div className="content">
          <header>
            <Logo />
          </header>
            <NavLinks />
        </div> 
      </div>
      }
    </Wrapper>
  )
}

export default BigSidebar