import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const CategoriesPanel = () => {

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/items/categories`)
        .then(response => {
          setCategories(response.data.data.results)
          
          
        })
        .catch(error => {
          console.log(error.message);
          
      })
        
      }, [])

      function linkToStore(category) {
    
        navigate(`/store/${category}`);
      }

  return (
    <div className='category-panel'>
      <div>
        <label>Categories</label>
        
      </div>
      <div className='category-item-panel'>
        {categories.length < 1 
        ? (
            <div className='category-item placeholder-glow'>
                <img src={'https://placehold.co/150x150'} />
                <div className='detail'>
                <span className="placeholder col-8"></span>
                </div>
            </div>
        )
        : categories.map((item) => {
          return <div 
          key={item.id}
          onClick={() => linkToStore(item.name)}
          className='category-item'>
            {/* col-5 col-lg-3 */}
            <img 
            className='mb-3'
            src={item.image_path === '' || item.image_path === null
              ? 'https://placehold.co/150x150'
              : `http://localhost:4000/images/${item.image_path}`
            } width={150} height={150}/>
            <div className='detail'>
            <div>{item.name}</div>
            </div>
            
          </div>
        })}
      
      </div>
      
    </div>
  )
}
