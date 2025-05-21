import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext';

export const ItemCard = ({ item }) => {

  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart, decreaseQuantity } = useContext(CartContext);
  const [inCart, setInCart] = useState(undefined);

  useEffect(() => {
    // setInCart(cartItems.find((cart) => cart.id === item.id));
    if (item) {
      let value = cartItems.find((cart) => cart.id === item.id)
      
      
      

      if (value !== 'undefined') {
        setInCart(value);
      }
    } else {
      console.log('no item', item);
      
    }
  }, [cartItems]);

  return (
    <div className='item-card'>
      <img src={!item || item.image_path === '' || item.image_path === null ? `https://placehold.co/200x200` : `http://localhost:4000/images/${item.image_path}`}
        width={200} height={200}
        onClick={() => navigate(!item ? '' : `/item/${item.id}`)}
      />
      <div className='detail' onClick={() => navigate(item.hasOwnProperty('id') ? '' : `/item/${item.id}`)}>

        <div>{!item ? 'name' : item.name}</div>
        <div>${!item ? 'price' : item.price}</div>
        <div>In stocks: {!item ? 'quantity' : item.quantity}</div>

      </div>
      <div className='options'>

        {inCart === undefined && <button className='btn btn-primary mb-3'
          onClick={() => addToCart(item)}
        >Add in cart</button>}
        {inCart !== undefined && (
            <div className='mb-3'>

              <div className='mb-3'>
              <button className='btn btn-light'
                onClick={() => addToCart(item)}
              >+</button>
              <span>{inCart === undefined  ? 0 : inCart.inCart}</span>
              <button className='btn btn-light'
                onClick={() => decreaseQuantity(item)}
              >-</button>
              </div>
              <button className='btn btn-danger'
              onClick={() => removeFromCart(item)}>Remove</button>
            </div>
          )}

        
      </div>

    </div>
  )
}
