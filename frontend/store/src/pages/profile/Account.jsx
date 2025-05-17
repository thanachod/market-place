import React, { use, useContext, useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar'
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Link, useNavigate } from 'react-router-dom';

export const Account = () => {

    const [data, setData] = useState();
    const [wishlist, setWishlist] = useState();
    const [orders, setOrders] = useState();
    const { isLoggedIn } = useContext(UserContext)
    const cookies = new Cookies();
    const navigate = useNavigate();

    useEffect(() => {
        axios.post(`/users/validate`, {userToken: cookies.get('userToken')})
        .then((response) => {
            
            axios.get(`/users/info/${response.data.data.info.id}`)
            .then((response) => {
                setData(response.data.data.results[0])
                
            })
            .catch(error => {
                console.log(error.message);
                
            })

            axios.post(`/items/orders/count`, {user_id: response.data.data.info.id})
            .then(response => {
                 setOrders(response.data.data.results);
            })
            .catch(error => {
                console.log(error.message);
                
            })
            
        })
        .catch(error => {
        
            console.log(error.message);
            navigate('/login')
    
        })
        
       
    }, [isLoggedIn])

    return (
        <div>
            <Navbar />
            <div className='default-container profile-container'>
                <div className='profile-menu menu'>
                    <div>Menu</div>
                    <ul>
                        <li><Link to={'/account'}>Account</Link></li>
                        <li><Link to={'/account/orders'}>Orders</Link></li>
                        <li><Link to={'/account/wishlist'}>Wishlist</Link></li>
                    </ul>
                </div>
                <div className='profile-layout'>
                    <div>
                        Edit Account
                    </div>
                    <div className='profile-content'>
                        <div>
                            <img src={'/'} alt="" />
                        </div>
                        <p>Name</p>
                        <input type='text'
                            className='form-control'
                            // value={''} 
                            placeholder='Firstname Lastname'
                            />
                        <p>Email</p>
                        <input type='text'
                            className='form-control'
                            defaultValue={!data ? '' :data.email}
                            />
                            
                        <div>
                            <p>Wishlist: {wishlist ? wishlist.length : 0}</p>
                            <button className='btn btn-light'><Link to={'/account/wishlist'}>View all</Link></button>
                        </div>
                        <div>
                            <p>Orders: {orders ? orders.length : 0}</p>
                            <button className='btn btn-light'><Link to={'/account/orders'}>View all</Link></button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
