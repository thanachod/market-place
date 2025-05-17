import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar'
import { AdminMenu } from '../../components/AdminMenu'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export const EditItem = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [file, setFile] = useState();
    const [image, setImage] = useState();
    var formData = new FormData();
    const [item, setItem] = useState();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`/items/detail/${id}`)
            .then(response => {
                setItem(response.data[0]);
                setImage(`http://localhost:4000/images/${response.data[0].image_path}`)
            })

        axios.get(`/items/categories`)
            .then(results => {
                setCategories(results.data)
                
                
            })
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        formData = new FormData();


        const jsonFormat =  {
            name: e.target.name.value,
            price: e.target.price.value,
            quantity: e.target.quantity.value,
            description: e.target.description.value,
            category: e.target.category.value,
            
        }
        
        console.log(jsonFormat);
        

        formData.append('image', file)
        formData.append('data', JSON.stringify(jsonFormat));

        
        axios.put(`/items/${id}`, formData)
            .then(() => navigate('/admin-items'))



    }

    function handleChange(e) {
        var newData = { ...item }
        newData[e.target.id] = e.target.value;
        setItem(newData)

    }

    function handleUploadFile(e) {
        setImage(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0]);


    }

   

    return (
        <div>
            <Navbar />
            <div className='default-container admin-container'>
                <AdminMenu />
                <div className='admin-items'>
                    <form onSubmit={handleSubmit}>
                        <p>Item name</p>
                        <input type='text'
                            className='form-control'
                            onChange={handleChange}
                            id='name'
                            value={!item ? '' : item.name}
                        />
                        <p>Price</p>
                        <input type='number'
                            className='form-control'
                            onChange={handleChange}
                            id='price'
                            step={0.01}
                            value={!item ? '' : item.price}
                        />
                        <p>Quantity</p>
                        <input type='number'
                            className='form-control'
                            onChange={handleChange}
                            id='quantity'
                            value={!item ? '' : item.quantity}
                        />
                        <p>Category</p>
                        <select className='form-control'
                            id='category'
                        >
                            <option value={''}>Select the category</option>
                            {categories.length < 1
                                ? (
                                    ''
                                )
                                : (
                                    categories.map((category, index) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                )))}
                        </select>
                        <p>Description</p>
                        <textarea rows={5}
                            className='form-control'
                            onChange={handleChange}
                            id='description'
                            value={!item ? '' : item.description}
                        />
                        <div>
                            <img src={!image ? null : image} width={125} height={125} />
                        </div>
                        <input type='file'
                            className='form-control'
                            id='file'
                            onChange={handleUploadFile}
                        />
                        <button type='submit'
                            className='btn btn-primary'
                        >Edit</button>
                        
                    </form>
                    
                </div>
            </div>
        </div>
    )
}
