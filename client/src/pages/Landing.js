import main from '../assets/images/landing-1.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import Logo from '../components/Logo';
import { Link } from 'react-router-dom';
function Landing() {
  return (
    <Wrapper className='page'>
        {/* <nav style={{marginTop:"100px", marginLeft:"50px", width:"20%", height:"0", }}> */}
        <nav className='nav1'>
           <Logo />
        </nav>
        <div className="container page">
            <div className='info'>
                <h1>job <span>tracking</span> app.</h1>
                <p>
                I'm baby ramps poke artisan, grailed vexillologist YOLO fit gorpcore etsy everyday carry vaporware green juice cronut banh mi pabst. Shoreditch offal kinfolk literally asymmetrical chartreuse.
                </p>
                <Link to="/register">
                  <button className='btn bth-hero'>Login/Register</button>
                </Link>
            </div>
            <img src={main} alt="job hunt" className='img main-img' />
        </div>
    </Wrapper>
  )
}

export default Landing