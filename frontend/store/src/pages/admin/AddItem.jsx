import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar'
import { AdminMenu } from '../../components/AdminMenu'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AddItem = () => {

  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  var formData = new FormData();
  const [item, setItem] = useState();
  const [categories, setCategories] = useState([]);

  useEffect(() => {

    axios.get(`/items/categories`)
      .then(results => {
        setCategories(results.data.data.results)

      })
      .catch(error => {
        console.log(error.message);
        
      })
  }, [])

  function handleSubmit(e) {
    e.preventDefault();
    formData = new FormData();



    const jsonFormat = {
      name: e.target.name.value,
      price: e.target.price.value,
      quantity: e.target.quantity.value,
      category: e.target.category.value,
      description: e.target.description.value
    }

    formData.append('image', file)
    formData.append('data', JSON.stringify(jsonFormat));


    axios.post('/items/add-item', formData)
      .then(() => navigate('/admin-items'))
      .catch(error => {
        console.log(error.message);
        
      })



  }

  function handleChange(e) {
    var newData = { ...item }
    newData[e.target.id] = e.target.value;
    setItem(newData)

  }

  function handleUploadFile(e) {
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
            <p>Item name</p>
            <input type='text'
              className='form-control'
              id='name'
            />
            <p>Price</p>
            <input type='number'
              className='form-control'
              onChange={handleChange}
              id='price'
              step={0.01}
              defaultValue={0}

            />
            <p>Quantity</p>
            <input type='number'
              className='form-control'
              onChange={handleChange}
              id='quantity'
              defaultValue={0}
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
