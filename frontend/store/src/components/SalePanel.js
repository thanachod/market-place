import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export const SalePanel = () => {

    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    var range = (start, stop, step = 1) => {
        const length = Math.ceil((stop - start) / step);
        return Array.from({ length }, (_, i) => (i * step) + start);
    }
    const item_placeholders = range(1, 8)

    useEffect(() => {
        axios.get(`/items`)
            .then(response => {

                // setItems(response.data)
                console.log(response.data.data.results);
                
            })
            .catch(error => {
                console.log(error.message);
                
            })
    }, [])


    function navigateSaleItem(item_id) {
        navigate(`/item/${item_id}`)
    }

    return (
        <div className='sale-container'>
            <div className='sale-title'>
                <label>On Sale</label>
                <button className='btn btn-outline-danger'>View all sale products</button>
            </div>

            <div className='flashsale-panel'>

                {items.length < 1
                    ? (
                        item_placeholders.map((item) => (
                            <div className='flashsale-item' key={item}>
                                <img src={'https://placehold.co/150x150'} />
                                <div className='item placeholder-glow'>
                                    <div className='name'>
                                        <span className="placeholder col-8"></span>
                                    </div>
                                    <div className='price'>

                                        $<span className="placeholder col-4"></span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                    : (
                        items.slice(0, 10).map(item => (

                            <div className='flashsale-item'
                                key={item.id}
                                onClick={() => navigateSaleItem(item.id)}
                            >
                                <div>
                                    <img src={item.image_path === '' || item.image_path === null ? `https://placehold.co/150x150`: `http://localhost:4000/images/${item.image_path}`} 
                                        width={150} height={150}
                                    />
                                </div>
                                <div className='item d-flex flex-column p-2'>
                                    <div className='name'>
                                        {item.name}
                                    </div>
                                    <div className='price'>
                                        ${item.price}
                                    </div>
                                    <div className='quantity'>
                                        In stocks: {item.quantity}
                                    </div>
                                </div>
                            </div>


                        ))
                    )}
            </div>
        </div>
    )
}
