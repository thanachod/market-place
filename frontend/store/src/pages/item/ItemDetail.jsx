import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export const ItemDetail = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState();
    const [image, setImage] = useState();

    useEffect(() => {
        axios.get(`/items/detail/${id}`)
            .then(response => {
                setItem(response.data[0]);
                setImage(`http://localhost:4000/images/${response.data[0].image_path}`)
            })

        
    }, [])

  return (
    <div>
        <Navbar />
        <div className='default-container'>
            <div>

            </div>
            <div className='item-detail'>
                {!item
                ? (
                    ''
                )
            : (
                <div className='detail'>
                    <img src={item.image_path === '' || item.image_path === null ? `https://placehold.co/150x150`: `http://localhost:4000/images/${item.image_path}`} 
                    alt='' width={150} height={150}/>
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{item.quantity}</p>
                    <p>{item.category}</p>
                    <p>{item.description}</p>
                </div>
            )}
            </div>
        </div>
    </div>
  )
}
