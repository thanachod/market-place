import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

export const SignUp = () => {

  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [message, setMessage] = useState();
  const formData = new FormData();
  const navigate = useNavigate();


  function handleSubmit(e){
    e.preventDefault();

    if (isPasswordMatches(
      e.target.password.value,
      e.target.password_confirm.value
    )) {
      const jsonFormat = {
        email: e.target.email.value,
        password: e.target.password.value,
  
      }
      setMessage(null)
  
      // formData.append('data', jsonFormat);
  
      axios.post(`/users/user-creation`, jsonFormat)
      .then(() => {
        navigate('/login');
      })
    } else {
      setMessage('Your Password is not match.')
    }
    
  }

  function isPasswordMatches(password, passwordConfirm) {
    if (password && passwordConfirm) {
      if (+password === +passwordConfirm){

        return true
      }
      else {
        return false
      }
    } else {
      return false
    }
  }

  return (
    <div>
      <Navbar />
      <div className='default-container'>
      <div className='signup-container'>
          <form 
          onSubmit={handleSubmit}
          className=''>
            <span>Email</span>
            <input type='text'
            className='form-control'
            id='email'
            required
            />
            <span>Password</span>
            <input type='password'
            className='form-control'
            id='password'
            required
            />
            <span>Confirm Password</span>
            <input type='password'
            className='form-control'
            id='password_confirm'
            required
            />

            {/* <span>Birth Date</span>
            <input type='date' 
            className='form-control'/> */}
            {message && (
              <span className='error-message'>{message}</span>
            )}
            <button className='btn btn-primary'>Sign Up</button>
            <span>Already has an account? <Link to={'/login'}>Log In</Link></span>
          </form>
        </div>
      </div>
    </div>
  )
}
