import React from 'react'
import img from '../assets/images/error.svg'
import Wrapper from '../assets/wrappers/ErrorPage'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <Wrapper className='full-page'>
      <div>
        <img src={img} />
        <h3>Oopsiee!!!</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to="/" >go back home</Link>
      </div>
    </Wrapper>
  )
}

export default Error