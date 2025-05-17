import React from 'react'
import { Navbar } from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { Footer } from '../components/Footer'

export const Login = () => {

  const cookies = new Cookies(null, {path: '/'});
  const navigate = useNavigate();

  function handleSubmit(e){
    e.preventDefault();

    const jsonFormat = {
      email: e.target.email.value,
      password: e.target.password.value,
    }
    axios.post('/users/login', jsonFormat)
    .then((response) => {
      console.log(response);
      
      if (response.data.status === "success") {
        console.log(response.data);
        if(response.data.data.isLoggedIn){
          
          
          cookies.set('userToken', JSON.stringify(response.data.data.info))
          navigate('/account')
        } 
        
      }
    })
    .catch(error => {
      console.log(error.message);
        
    })
  }

  return (
    <div>
      <Navbar />
      <div className='default-container'>
        <div className='login-container'>
          <form onSubmit={handleSubmit}>
            <span>Email</span>
            <input type='text'
            className='form-control'
            id='email'
            />
            <span>Password</span>
            <input type='password'
            className='form-control'
            id='password'
            />
            <button className='btn btn-primary'>Log In</button>
            <span>Create a new account? <Link to={'/signup'}>Sign Up</Link></span>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}
