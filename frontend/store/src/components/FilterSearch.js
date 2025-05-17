import React, { useEffect, useState } from 'react'
import axios from 'axios';

export const FilterSearch = ({ isFetched, setItems }) => {

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [checkedState, setCheckedState] = useState([]);
    
    

    useEffect(() => {
        
        if (isFetched) {
            
            axios.get('/categories')
            .then(response => {
                setCategories(response.data)
                
            })
            
        }
    }, [isFetched])

    useEffect(() => {

        const initialState = selectedCategories.map((item, index) => {
            return {"category": item, "isChecked": false}
        })

        setCheckedState(initialState)
        
    }, [selectedCategories])

    async function setCategories(items) {
                console.log(items);
                var newData = []
                for (let item of items) {
                    var newItem = item.name
                    const found = await newData.some(elem => elem === newItem)
                    if (!found) {
                        newData.push(newItem)
                    }
                 
                }
    
                await setSelectedCategories([...newData])
                
    
            }

    async function updateItems(e) {
        // axios.post('/items')
        e.preventDefault();
        console.log(checkedState);
        
        
        const getFilter = await checkedState.filter((item) => item.isChecked === true)
        const arrayFilter = await getFilter.map((item) => item.category);
        console.log('getFilter: ', arrayFilter);
        axios.post(`/filtered`, {
            search: '', categories: []
        })
    }

    async function handleCheckbox(position) {
        
        
        
        const updateCheckState = await checkedState.map((item, index) => 
            index === position ? {...item, isChecked: !item.isChecked} : {...item}
        )
        console.log(updateCheckState);
        
        setCheckedState(updateCheckState)
    };

    return (
        <>
            
            <form className='filter-layout simple-ui p-3'
            onSubmit={updateItems}
            >
                <div>Categories</div>
                <div
                    className=' mb-3'>
                    
                        {selectedCategories.length < 1 
                            ? (
                                <div className='placeholder-glow placeholder-container'>
                                    <span className="placeholder col-3"></span>
                                    <span className="placeholder col-3"></span>
                                    <span className="placeholder col-3"></span>
                                </div>
                            )
                            : (
                                <>
                                 {selectedCategories.map((item, index) => (
                                    <div key={item.id}>
                                        <input type='checkbox' className='mb-2 me-1'
                                        name={'categories'} value={item}
                                        onClick={() => handleCheckbox(index)}
                                        />
                                        <label>{item}</label>
                                    </div>
                                ))}
                                </>
                                
                            )
                        }
                    
                    
                </div>
                
                <button
                    className='btn btn-primary mb-3'
                    type='submit'
                >Filter</button>
                <button
                    className='btn btn-light'
                >Reset</button>
            </form>

        </>
    )
}
