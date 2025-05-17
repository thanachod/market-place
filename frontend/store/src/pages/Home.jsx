import React from 'react'
import { Navbar } from '../components/Navbar'
import { Banner } from '../components/Banner'
import { SalePanel } from '../components/SalePanel'
import { Footer } from '../components/Footer'
import { CategoriesPanel } from '../components/CategoriesPanel'
import { Credits } from '../components/Credits'

export const Home = () => {
  return (
    <div>
      <Navbar />
      <div className='default-container home-container'>
        
        <div>
          <Banner />
        </div>
        <div>
          <SalePanel />
        </div>
        <div>
          <CategoriesPanel />
        </div>
        
      </div>
      <Footer />
    </div>
  )
}
