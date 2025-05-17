import React, { useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import axios from 'axios'

export const Test = () => {

    useEffect(() => {
        axios.get('/users/test');
    }, [])

  return (
    <div>
        <Navbar />

    </div>
  )
}
