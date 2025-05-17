import React from 'react'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { AdminMenu } from '../../components/AdminMenu'
import { Dashboard } from '../../components/Dashboard'

export const AdminDashboard = () => {
  return (
    <div>
        <Navbar />
        <div className='default-container admin-container'>
            <div>
                <AdminMenu />
            </div>
            <div className='dashboard'>
                <Dashboard />
            </div>
        </div>
        <Footer />
    </div>
  )
}
