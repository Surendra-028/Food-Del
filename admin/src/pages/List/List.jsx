import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import './List.css'

const List = ({url}) => {

    const [list, setList] = useState([])
    
    const handleGetItems = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`)
            console.log(response.data.data)
            if (response.data.success) {
                setList(response.data.data)
            } else {
                toast.error(response.data.message || "Failed to fetch items")
            }
        } catch (error) {
            console.error(error)
            toast.error("Error connecting to server")
        }
    }

    const removeFood = async (foodId) => {
        try {
            const response = await axios.post(`${url}/api/food/remove`, { id: foodId })
            await handleGetItems()
            if (response.data.success) {
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error("Error deleting item")
        }
    }

    useEffect(() => {
        handleGetItems();
    }, [])

    return (
        <div className='list-container'>
            <p className='list-title'>All Foods List</p>
            <div className="list-table">
                <div className="list-table-header">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => (
                    <div key={index} className="list-table-row">
                        <img src={`${url}/images/` + item.image} alt={item.name} />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>${item.price}</p>
                        <p onClick={() => removeFood(item._id)} className='delete-icon'>X</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default List