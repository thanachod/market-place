import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaShoppingBag, FaShoppingCart, FaStore, FaUser } from "react-icons/fa";
import { MdLogin, MdLogout } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import Cookies from 'universal-cookie';
// import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

export const Navbar = () => {

  const cookies = new Cookies(null, { path: '/' });
  const [username, setUsername] = useState();
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //   const {
  //     isLoggedIn,
  //     setIsLoggedIn,
  //     setAuthUser,
  //     authUser
  //   } = useAuth();



  useEffect(() => {
    
    if (cookies.get('userToken')){
      axios.post('/users/validate', { userToken: cookies.get('userToken') })
      .then(response => {
        
        
        if(response.data.isLoggedIn){
          setUsername(response.data.username);
          setIsLoggedIn(true)
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(error => {
        console.log(error.message);
        
    })
      
    }
    
  }, [])



  function logOut(e) {
    e.preventDefault();
    cookies.remove('userToken');

    setIsLoggedIn(false);
    navigate('/login')
  }

  return (
    <div className='navbar-layout'>
      <label className='logo'><FaShoppingBag /></label>
      {/* <div className='navbar-menu-fullscreen'>
        <Link to={'/'}><FaHome /> Home</Link>

        <Link to={'/store'}><FaStore /> Store</Link>
        <Link to={'/cart'}><FaShoppingCart /> Cart</Link>
        <Link to={'/profile'}><FaUser /> Profile</Link>


        {isLoggedIn
          ? <Link to={'/login'} onClick={logOut}><MdLogout /> : {username}</Link>
          : <Link to={'/login'}><MdLogin /></Link>}

        
        <Link to={'/test'}>Test</Link>
      </div> */}
      <ul>
        <li><Link to={'/'}><FaHome /> Home</Link></li>
        <li>
          <Link to={'/store'}><FaStore /> Store</Link>
        </li>
        <li>
          <Link to={'/cart'}><FaShoppingCart /> Cart ({cartItems.length})</Link>
        </li>
        <li>
          <Link to={'/admin'}><RiAdminFill /> Admins</Link>
        </li>
        <li>
          <Link to={'/account'}><FaUser /> Account</Link>
        </li>

        {isLoggedIn
          ? (
            <li>
              <Link to={'/account'} onClick={logOut}><FaUser /> Log out</Link>
            </li>
          )
          : (
            <li><Link to={'/login'}><FaUser /> Log in</Link>
            </li>
          )}

        <li>
          <Link to={'/test'}>Test</Link>
        </li>



      </ul>

    </div>
  )
}
