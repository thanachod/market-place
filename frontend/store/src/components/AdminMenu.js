import React from 'react'
import { Link } from 'react-router-dom'

export const AdminMenu = () => {
  return (
    <div className='menu'>
        <p><Link to={'/admin'}>Dashboard</Link></p>
        <span>Item Management</span>
        <ul>
            <li><Link to={'/admin-items'}>Items</Link></li>
            <li><Link to={'/admin-categories'}>Categories</Link></li>
            
        </ul>
        <span>User Management</span>
        <ul>
            <li><Link to={'/admin-users'}>Users</Link></li>
            <li><Link to={'/admin-orders'}>Orders</Link></li>
        </ul>
        </div>
  )
}
