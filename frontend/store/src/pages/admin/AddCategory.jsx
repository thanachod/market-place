import React, { useState } from 'react'
import { Navbar } from '../../components/Navbar'
import { AdminMenu } from '../../components/AdminMenu'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AddCategory = () => {

    const navigate = useNavigate();
    const [file, setFile] = useState();
    var formData = new FormData();
    
    function handleSubmit(e) {
        e.preventDefault();
        formData = new FormData();
        
        

        const jsonFormat = {
            name: e.target.name.value,
            description : e.target.description.value
        }

        formData.append('image', file)
        formData.append('data', JSON.stringify(jsonFormat));

        
        axios.post('/items/add-category', formData)
        .then(() => navigate('/admin-categories'))
        .catch(error => {
            console.log(error.message);
            
        })

        
        
    }

    function handleUploadFile(e){
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
                        id='name'
                        />
                        <p>Description</p>
                        <textarea  rows={5} 
                        className='form-control'
                        id='description'
                        />
                        <input type='file' 
                        className='form-control'
                        id='file'
                        onChange={handleUploadFile}
                        />
                        <button type='submit'
                        className='btn btn-primary'
                        >Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
