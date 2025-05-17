import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar'
import { AdminMenu } from '../../components/AdminMenu'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Pagination } from '../../components/Pagination';

export const AdminOrders = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    axios.post('/items/orders/view-all', {
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
        <div className='admin-items'>
          
          <table className='table-style' cellPadding={10}>
            <thead>
              <tr>
                <th>#</th>
                <th>Order Number</th>
                <th>Customer</th>
                <th>Order timestamp</th>
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
                      <td>{item.id}</td>
                      <td>${item.email}</td>
                      <td>{item.created_at}</td>
                      <td className='options'>
                        <button className='btn btn-info' onClick={() => navigate(`/edit-item/${item.id}`)}>View detail</button>
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
    </div>
  )
}
