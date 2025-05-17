import axios from 'axios';
import React, { useState } from 'react'

export const SearchBar = ({setSortType, sortType = 'Relevance', setItems, searchTerm = "", currentPage, PageSize }) => {

    const [searchInput, setSearchInput] = useState(searchTerm);
    const sortList = ["Relevance", "Popular", "Most Recent", "High Price"]

    function handelSelectedSortType(e) {
        e.preventDefault();
        setSortType(e.target.value)
    }


    async function handleSearch(e) {
        e.preventDefault();
        
        const name = e.target.search.name;
        const value = e.target.search.value;
        
        
        
        await axios.post("http://localhost:4000/items/filtered",
            {[name]: value.toString().toLowerCase(),
                currentPage: parseInt(currentPage),
                pageSize: PageSize,
            }
        )
        .then(response => {
            console.log('data_', response.data.results);
            setItems(response.data.results)
            
        })
    }

    return (
        <div>
            <form className='search-container' onSubmit={handleSearch}>
                <div className='search-bar'>
                    <input type='search'
                        name='search'
                        className='form-control '
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        />
                    <button className='btn btn-primary search-btn'
                    type='submit'
                    >Search</button>
                </div>
                <div>
                    {sortList.map(item => (
                        <button 
                        key={item}
                        onClick={handelSelectedSortType} value={item}
                        className='btn btn-light mx-3'
                    >{item}</button>
                    ))}
                    
                </div>
                <div>
                    {sortType}
                </div>



            </form>
        </div>
    )
}
