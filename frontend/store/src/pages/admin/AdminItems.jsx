import React, { useEffect, useMemo, useState } from 'react'
import { AdminMenu } from '../../components/AdminMenu'
import { Dashboard } from '../../components/Dashboard'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { MdAddCircle } from 'react-icons/md'
import { Pagination } from '../../components/Pagination'

export const AdminItems = () => {

    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
   

    useEffect(() => {
        axios.post('/items', {
            currentPage: currentPage,
            pageSize: pageSize,
        })
            .then(response => {
                setItems(response.data.data.results)
                setTotalPages(response.data.data.totalPage)
                
                

            })
            .catch(error => {
                console.log(error.message);
                
            })
    }, [currentPage])

    function onPageChange(page) {
        
        setCurrentPage(page)
    }

    

    return (
        <div>
            <Navbar />
            <div className='default-container admin-container'>
                <div>
                    <AdminMenu />
                </div>
                <div className='admin-items'>
                    <div>

                        <button className='add-item'
                            onClick={() => navigate('/add-item')}
                        ><MdAddCircle /> Add new item</button>
                    </div>
                    <table className='table-style' cellPadding={10}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Category</th>
                                <th>Wishlist</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length < 1
                                ? (
                                    <tr className='placeholder-glow'>
                                        <td><span className='placeholder col-12'></span></td>
                                        <td><span className='placeholder col-12'></span></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td className='options'>
                                            <button className='btn btn-info' >Edit</button>
                                            <button className='btn btn-danger'>Remove</button>
                                        </td>
                                    </tr>
                                )
                                : (
                                    items.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>${item.price}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.category}</td>
                                            <td></td>
                                            <td className='options'>
                                                <button className='btn btn-info' onClick={() => navigate(`/edit-item/${item.id}`)}>Edit</button>
                                                <button className='btn btn-danger'>Remove</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                        </tbody>
                    </table>
                    <div className='pagination'>
                        <Pagination 
                        currentPage={currentPage} pageSize={pageSize}
                        onPageChange={onPageChange}
                        totalCount={totalPages}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
