import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar'
import { AdminMenu } from '../../components/AdminMenu'
import { Dashboard } from '../../components/Dashboard'
import { Footer } from '../../components/Footer'
import { Pagination } from '../../components/Pagination'
import axios from 'axios'

export const AdminUsers = () => {

    const [items, setItems] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();


    useEffect(() => {
        axios.post('/items/users/view-all', {
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
      }, [currentPage]);

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
                <div className='pagination'>
                            <Pagination
                              currentPage={currentPage} pageSize={pageSize}
                              onPageChange={onPageChange}
                              totalCount={totalPages}
                            />
                          </div>
            </div>
            <Footer />
        </div>
  )
}
