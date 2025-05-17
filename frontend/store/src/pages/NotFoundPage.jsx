import React from 'react'
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className='default-container not-found-container'>
        <h1>404 </h1>
        <h1>Not Found</h1>
        <button className='btn btn-light p-3 rounded'>
            <Link to={'/store'}>
            Go back to store page
            </Link>
        </button>
    </div>
  )
}
