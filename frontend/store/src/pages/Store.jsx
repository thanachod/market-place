import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { FilterSearch } from '../components/FilterSearch'
import { ItemCard } from '../components/ItemCard'
import { SearchBar } from '../components/SearchBar'
import { Footer } from '../components/Footer'
import axios from 'axios'
import { Pagination } from '../components/Pagination'

export const Store = () => {

  var range = (start, stop, step = 1) => {
    const length = Math.ceil((stop - start) / step);
    return Array.from({ length }, (_, i) => (i * step) + start);
  }
  const item_placeholders = range(1, 10)

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {

    setIsLoading(true);
    axios.post(`/items`, {
      currentPage: currentPage,
      pageSize: pageSize,
    })
      .then(response => {
        setItems(response.data.data.results)
        setTotalPages(response.data.data.totalPage)
        setIsLoading(false);
      })
      .catch(error => {

        setErrorMessage(error.message)
      })
  }, [currentPage])

  function onPageChange(page) {

    setCurrentPage(page);
  }

  return (
    <div>
      <Navbar />
      <div className='default-container store-container'>
        <div>
          <FilterSearch />
        </div >


        <div className='layout'>
          {!errorMessage ? <></> : (<div className='error-container'>
            {JSON.stringify(errorMessage)}
          </div>)}
          <div>
            <SearchBar

            />
          </div>
          

            {isLoading
              ? (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                  </div>
                </div>
              )
              : (
                <div>
                  <div className='items-layout'>
                  {items.map((item, index) => (
                  <ItemCard item={item} key={item.id} />
                ))}
                  </div>
                  <div className='pagination'>
                  <Pagination currentPage={currentPage} pageSize={pageSize}
                    onPageChange={onPageChange}
                    totalCount={totalPages}
                  />
                </div>
                </div>
                
              )}
          
          
        </div>
      </div>
      <Footer />
    </div>
  )
}
