import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar'
import { AdminMenu } from '../../components/AdminMenu'
import { Footer } from '../../components/Footer'
import axios from 'axios'

import { MdAddCircle } from "react-icons/md";
import { useNavigate } from 'react-router-dom'

export const AdminCategories = () => {

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/items/categories')
            .then(response => {
                setCategories(response.data.data.results)
                
            })
            .catch(error => {
                console.log(error.message);
                
            })
    }, [])

    return (
        <div>
            <Navbar />
            <div className='default-container admin-container'>
                <div>
                    <AdminMenu />
                </div>
                <div className='admin-categories'>
                    <div>

                        <button className='add-category'
                            onClick={() => navigate('/add-category')}
                        ><MdAddCircle /> Add new category</button>
                    </div>

                    <table className='table-style' cellPadding={10}>
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>name</th>
                                <th>items</th>
                                <th scope='col'>options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length < 1
                                ? (
                                    <tr className='placeholder-glow'>
                                        <td><span className='placeholder col-12'></span></td>
                                        <td><span className='placeholder col-12'></span></td>
                                        <td><span className='placeholder col-12'></span></td>
                                        <td className='options'>
                                            <button className='btn btn-info' >Edit</button>
                                            <button className='btn btn-danger'>Remove</button>
                                        </td>
                                    </tr>
                                )
                                : (
                                    categories.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td></td>
                                            <td className='options'>
                                                <button className='btn btn-info' onClick={() => navigate(`/edit-category/${item.id}`)}>Edit</button>
                                                <button className='btn btn-danger'>Remove</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    )
}
