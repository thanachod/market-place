import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar'
import { AdminMenu } from '../../components/AdminMenu'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export const EditCategory = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [file, setFile] = useState();
    const [image, setImage] = useState();
    var formData = new FormData();
    const [item, setItem] = useState();

    useEffect(() => {
        axios.get(`/items/category/${id}`)
        .then(response => {
            setItem(response.data[0]);
            setImage(`http://localhost:4000/images/${response.data[0].image_path}`)
        })
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();
        formData = new FormData();


        const jsonFormat =  await {
            name: e.target.name.value,
            description : e.target.description.value
        }
        
        formData.append('image', file)
        formData.append('data', JSON.stringify(jsonFormat));

        axios.put(`/items/category/${id}`, formData)
        .then(() => navigate('/admin-categories'))

        
        
    }

    function handleChange(e) {
        var newData = {...item}
        newData[e.target.id] = e.target.value;
        console.log(e.target.id);
        
        console.log(newData);
        
        setItem(newData)
        
    }

    function handleUploadFile(e){
        setImage(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0]);
        
        
    }

    return (
        <div>
            <Navbar />
            <div className='default-container admin-container'>
                <div>
                    <AdminMenu />
                </div>
                <div className='admin-categories'>
                <form onSubmit={handleSubmit}>
                        <p>Category name</p>
                        <input type='text' 
                        className='form-control'
                        onChange={handleChange}
                        id='name'
                        value={!item ? '' :item.name}
                        />
                        <p>Description</p>
                        <textarea  rows={5} 
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
