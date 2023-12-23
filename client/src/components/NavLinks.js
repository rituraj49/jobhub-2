import React from 'react'
import links from '../utils/links';
import { NavLink } from 'react-router-dom';

function NavLinks({ toggleSidebar }) {
    // const { toggleSidebar } = useAppContext();
  return (
    <div className='nav-links'>
              {
                links.map((link,i) => {
                  const { id, text, path, icon } = link;
                  return (
                      <NavLink 
                      to={path}
                      key={i} 
                      onClick={toggleSidebar}
                      // className={'nav-link '}
                      className={({isActive}) => 
                        isActive ? 'nav-link active' : 'nav-link'
                      }
                      end
                      >
                        <span className='icon'>{icon}</span>
                        {text}
                      </NavLink>

                    )  
                })
              }
            </div>
  )
}

export default NavLinks