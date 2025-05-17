import React, { createContext, useEffect, useState } from 'react'

export const CartContext = createContext();

function getDefaultCart() {
    
    if (localStorage.getItem('cart')){
        return JSON.parse(localStorage.getItem('cart'))

    } else {
        return []
    }
}

export const CartContextProvider = ({ children }) => {

    
    const [cartItems, setCartItems] = useState(() => {
        const item = getDefaultCart()
        return item ? item : undefined;
    });
    const test = getDefaultCart();

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }, [cartItems])

    const addToCart = (item) => {
        
        
        const isProductInCart = cartItems.find((cartProduct) => cartProduct.id === item.id);
        if(isProductInCart){
            setCartItems(
                cartItems.map((cartItem) =>
                cartItem.id === item.id
                ? { ...cartItem, inCart: cartItem.inCart + 1 }
                : cartItem
                )
            );



        } else {
            setCartItems([ ...cartItems, { ...item, inCart: 1}]);
            
        }
        
        
        
    }
    const removeFromCart = (item) => {
        // setCartItems((prev) => ({...prev, [item_id]: prev[item_id] - 1}))
        const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
        if (isItemInCart) {
            if (isItemInCart.inCart === 1) {
                let newData = cartItems.filter((cartItem) => cartItem.id !== item.id)
                setCartItems(newData);
    
            } else {
                setCartItems(
                    cartItems.map((cartItem) => 
                        cartItem.id === item.id
                        ? { ...cartItem, inCart: cartItem.inCart - 1}
                        : cartItem
                    )
                );
            }
        } else {
            return
        }
        

    }

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.inCart, 0);
    }

    const contextValue = { cartItems, setCartItems, addToCart, removeFromCart, getCartTotal};

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
};


