import React from 'react'
import { Navbar } from '../../components/Navbar'

export const Profile = () => {
  return (
    <div>
        <Navbar />
        <div className='default-container profile-container'>
            <div className='profile-menu'>
                <div>Menu</div>
                <ul>
                    <li>Account</li>
                    <li>Orders</li>
                </ul>
            </div>
            <div className='profile-layout'>
                <div>
                    Edit Account
                </div>
                <div className='profile-content'>
                <p>Name</p>
                <input type='text' 
                className='form-control'
                value={''}/>
                <p>Email</p>
                <input type='text' 
                className='form-control'
                value={''}/>
                </div>
                
            </div>
        </div>
    </div>
  )
}
