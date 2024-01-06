import React, { useState } from 'react'
import Wrapper from '../assets/wrappers/Navbar'
import { MdOutlineSwitchLeft, MdOutlineSwitchRight } from 'react-icons/md'
import { FaBalanceScaleLeft, FaBalanceScaleRight } from 'react-icons/fa'
import { BiSolidDockLeft, BiSolidDockRight } from 'react-icons/bi'
import { FaUser, FaCaretDown, FaCaretUp } from 'react-icons/fa'
import Logo from './Logo'
import { useAppContext } from '../context/appContext'
function Navbar() {

  const { toggleSidebar, showSidebar, user, logoutUser } = useAppContext();
  const[showLogout, setShowLogout] = useState(false);
  return (
    <Wrapper>
      <div className="nav-center">
        <img src={user.avatar} alt="avatar" className='img-profile' />
        <button
          type='button'
          className="toggle-btn"
          onClick={toggleSidebar}
        >
          {
            showSidebar ?
            <BiSolidDockLeft /> :
            <BiSolidDockRight />
          }
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">Dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type='button'
            className='btn'
            onClick={() => setShowLogout(!showLogout)}>
              {
                user.avatar ? 
                <img src={user.avatar} alt="avatar" className='img' /> 
                :
                <FaUser />
              }
            {user?.name}
            { showLogout ?
            <FaCaretUp />:
            <FaCaretDown /> 
            }
          </button>
          { showLogout && 
            <div className='dropdown show-dropdown' >
            <button className='dropdown-btn' onClick={() => logoutUser()}>
              logout
            </button>
          </div>
          }
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar


// secretary mail - council members training