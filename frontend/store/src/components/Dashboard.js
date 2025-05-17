import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const Dashboard = () => {

  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/items')
      .then(response => {
        setItems(response.data.data.results)
      })
      .catch(error => {
        console.log(error.message);
        
    })

    axios.get('/items/categories')
      .then(response => {
        setCategories(response.data.data.results)
      })
      .catch(error => {
        console.log(error.message);
        
    });

    axios.get('/items/orders/get-all')
      .then(response => {
        setOrders(response.data.data.results)
      })
      .catch(error => {
        console.log(error.message);
        
    });

    axios.get('/users/get-all')
      .then(response => {
        setUsers(response.data.data.results)
      })
      .catch(error => {
        console.log(error.message);
        
    });
  }, [])

  return (
    <div className='dashboard-container'>
      Dashboard
      <div className='dashboard-card'>
        <span>Items</span>
        <div className='value'>
          {items.length}
        </div>
      </div>
      <div className='dashboard-card'>
        <span>Categories</span>
        <div className='value'>
          {categories.length}
        </div>
      </div>
      <div className='dashboard-card'>
        <span>Orders</span>
        <div className='value'>
          {orders.length}
        </div>
      </div>
      <div className='dashboard-card'>
        <span>Customers</span>
        <div className='value'>
          {users.length}
        </div>
      </div>


    </div>
  )
}
