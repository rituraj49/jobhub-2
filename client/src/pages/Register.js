import React from 'react'
import { useState, useEffect } from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import { Alert, FormRow, Logo } from '../components/index';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
  // showAlert:false // it is coming from context
}
function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  // global state and useNavigate placeholder

  // const state = useAppContext();
  const { isLoading, showAlert, displayAlert, clearAlert, registerUser, user, loginUser, setupUser, setupTestUser } = useAppContext();
  // console.log(state.isLoading);
  const toggleMember = (e) => {
    e.preventDefault();
    setValues({ ...values, isMember: !values.isMember })
  }

  const handleChange = (e) => {
    // console.log(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
    // clearAlert();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    const { name, email, password, isMember } = values;
    // const regex = /[A-Za-z]/;
    if (!email || !password || (!isMember && !name)) {
      console.log("no values");
      displayAlert();
      return;
    }
    
    const currentUser = { name, email, password }
    if (isMember) {
      // loginUser(candidateUser);
      setupUser({ currentUser, endPoint: 'login', alertText: 'Login successful! Redirecting...' });
      console.log('already a member');
    } else {
      // registerUser(currentUser);
      // console.log(currentUser,'currUser');
      setupUser({ currentUser, endPoint: 'register', alertText: 'User created successfully! Redirecting...' });
      console.log('register member');
    }
    // console.log(values);
  }

  const loginTestUser = (e) => {
    e.preventDefault();
    const testUser = {
      email:'test@test.com',
      password:'1234test'
    }
    setupUser({ currentUser: testUser, endPoint: 'login', alertText: 'Login successful! Redirecting...' });
    console.log(testUser, 'logged in');
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 3000)
    }
  }, [user, navigate])

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {
          showAlert && <Alert />
        }
        {/* name input */}
        {
          !values.isMember &&
          <FormRow
            name="name"
            value={values.name}
            handleChange={handleChange}
            labelText="Name" type="text" />
        }
        {/* email input */}
        <FormRow
          name="email"
          value={values.email}
          handleChange={handleChange}
          labelText="Email" type="email" />

        {/* password input */}
        <FormRow
          name="password"
          value={values.password}
          handleChange={handleChange}
          labelText="Password" type="password" />
        <button type='submit' className='btn btn-block' disabled={isLoading}>submit</button>
          <button className='btn btn-block' onClick={loginTestUser}>
            Explore App
          </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button className='member-btn' onClick={toggleMember}>
            {values.isMember ? 'Register' : 'Login'}
          </button>
          <button className='member-btn'>
            {values.isMember && 'Forgot password?'}
          </button>
        </p>
      </form>
    </Wrapper >
  )
}

export default Register