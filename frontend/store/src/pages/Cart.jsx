import React, { useContext, useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { CartContext } from '../context/CartContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { UserContext } from '../context/UserContext'
import Cookies from 'universal-cookie'

export const Cart = () => {
  const { cartItems, setCartItems, addToCart, removeFromCart, decreaseQuantity, getCartTotal } = useContext(CartContext)
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext)
  const cookies = new Cookies();
  const [user, setUser] = useState();

  useEffect(() => {

    if (isLoggedIn) {
      axios.post(`/users/validate`, { userToken: cookies.get('userToken') })
        .then((response) => {
          console.log(response.data.id);
          setUser(response.data);


        })
    }



  }, [isLoggedIn])

  function checkOut(items) {
    axios.post(`/users/validate`, { userToken: cookies.get('userToken') })
      .then((response) => {

        if (response.data.info.id) {
          console.log('log: ', response.data);
          const jsonFormat = {
            user: response.data.info.id,
            cart: cartItems
          }
          axios.post(`/items/order/checkout`, jsonFormat)
            .then((response) => {
              console.log(response);

              // if()
              // setCartItems([]);
              // navigate('/store');
            })

        } else {
          navigate('/login');

        }
      })
      .catch(error => {
        console.log(error.message);
        navigate('/login')
      })

    // if(!isLoggedIn){
    //   navigate('/login')
    // } else {
    //   const jsonFormat = {
    //     user: user.id,
    //     cart: cartItems
    //   }
    //   axios.post(`/items/order`, jsonFormat)
    //   .then(() => {
    //     navigate('/store');
    //   }) 
    // }


  }



  return (
    <div>
      <Navbar />
      <div className='default-container'>
        <div className='cart'>
          <div className='cart-layout'>
            <p>Cart</p>
            <div className='cart-header'>
              <span>name</span>
              <span>quantity</span>
              <span>
                price

              </span>
              <span>total</span>
              <span>options</span>
            </div>
            {cartItems.length < 1 ?
              ('')
              : (
                cartItems.map((item, index) => (
                  <div className='cart-item' key={item.id}>
                    <img src={item.image_path === '' || item.image_path === null ? `https://placehold.co/150x150` : `http://localhost:4000/images/${item.image_path}`}
                      width={150} height={150}
                    />
                    <span>{item.name}</span>
                    <span>
                      <button className='btn btn-light px-3 mx-3'
                        onClick={() => addToCart(item)}
                      >+</button>
                      {item.inCart}
                      <button className='btn btn-light px-3 mx-3'
                        onClick={() => decreaseQuantity(item)}
                      >-</button>
                    </span>
                    <span>${item.price}</span>
                    <span>${item.inCart > 0 ? (item.inCart * item.price).toFixed(2) : item.price.toFixed(2)}</span>
                    <span><button className='btn btn-danger'
                     onClick={() => removeFromCart(item)}
                    >Remove</button></span>
                  </div>
                ))

              )}


          </div>
          <div>
            <div className='cart-checkout'>

              <span>subtotal: ${getCartTotal().toFixed(2)}</span>
              <span>Discount: ${0}</span>
              <span><button className='btn btn-info'
                onClick={checkOut}
              >Check out</button></span>
            </div>
          </div>
        </div>
        <div>

        </div>
      </div>
      <Footer />
    </div>
  )
}
