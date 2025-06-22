import React, { useContext, useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FilterSearch } from '../../components/FilterSearch';
import { SearchBar } from '../../components/SearchBar';
import { CartContext } from '../../context/CartContext';


export const ItemDetail = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState();
    const [image, setImage] = useState();
    const { addToCart, decreaseQuantity, removeFromCart } = useContext(CartContext);
    const [inCart, setInCart] = useState(undefined);

    useEffect(() => {
        axios.get(`/items/detail/${id}`)
            .then(response => {

                return response.data.data

            })
            .then(data => {

                setItem(data.results[0]);
                setImage(`http://localhost:4000/images/${data.results[0].image_path}`)
            })


    }, [])

    return (
        <div>
            <Navbar />
            <div className='default-container store-container'>
                <div>
                    <FilterSearch />
                </div>
                <div className='item-detail'>
                    <div>
                        <SearchBar />
                    </div>
                    {!item
                        ? (
                            ''
                        )
                        : (
                            <div className='detail'>
                                <div className='image'>
                                    <div>
                                        <img src={item.image_path === '' || item.image_path === null ? `https://placehold.co/150x150` : `http://localhost:4000/images/${item.image_path}`}
                                        alt='' width={150} height={150} />
                                    </div>
                                    <div>
                                        <img src={item.image_path === '' || item.image_path === null ? `https://placehold.co/150x150` : `http://localhost:4000/images/${item.image_path}`}
                                        alt='' width={50} height={50} />
                                        <img src={item.image_path === '' || item.image_path === null ? `https://placehold.co/150x150` : `http://localhost:4000/images/${item.image_path}`}
                                        alt='' width={50} height={50} />
                                        <img src={item.image_path === '' || item.image_path === null ? `https://placehold.co/150x150` : `http://localhost:4000/images/${item.image_path}`}
                                        alt='' width={50} height={50} />
                                    </div>
                                </div>
                                <div className='body'>
                                    <label className='name'>{item.name}</label>
                                    <label className='description'>{item.description}</label>
                                    <hr />
                                    <label className='price'>Price: ${item.price}</label>
                                    <label className='quantity'>Quantity: {item.quantity}</label>
                                    <div className='category-tag'>
                                        <button className='category btn btn-light'>{item.category}</button>
                                        <button className='category btn btn-light'>{item.category}</button>
                                    </div>
                                    <div className='mb-3'>

                                        <div className='mb-3'>
                                            <button className='btn btn-light'
                                                onClick={() => addToCart(item)}
                                            >+</button>
                                            <span>{inCart === undefined ? 0 : inCart.inCart}</span>
                                            <button className='btn btn-light'
                                                onClick={() => decreaseQuantity(item)}
                                            >-</button>
                                        </div>
                                        
                                    </div>

                                    <div className='button'>
                                        <button className='btn btn-primary'
                                            onClick={() => addToCart(item.id)}
                                        >Add to cart</button>
                                        <button className='btn btn-danger'
                                            onClick={() => removeFromCart(item)}>Remove</button>
                                    </div>
                                </div>


                            </div>
                        )}
                </div>
            </div>
        </div>
    )
}
