import styled from 'styled-components';

const Wrapper = styled.main`
    nav {
        /* width: var(--fluid-width); */
        max-width: var(--max-width);
        margin: 0 auto;
        height: var(--nav-height);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20vw;
        /* max-width: 20vw; */
        margin-left: 50px;
        /* background-color: red; */
    }
    .nav1 {
        /* width: var(--fluid-width); */
        max-width: var(--max-width);
        margin: 0 auto;
        height: var(--nav-height);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 250px;
        margin-left: 50px;
  }

    .page{
        height: calc(100vh - var(--nav-height));
        display: grid;
        align-items: center;
        margin-top: -3rem;
        p{
            color: var(--grey-600)
        }
    }

    h1{
        font-weight: 700;
        span{
           color: var(--primary-500) ;
        }
    }

    .main-img{
        display: none;
    }
    @media(min-width: 992px) {
        .page{
            grid-template-columns: 1fr 1fr;
        }
        .main-img{
            display: block;
        }
        /* nav{
            width: var(--fluid-width);
        } */
    }
`

export default Wrapper;