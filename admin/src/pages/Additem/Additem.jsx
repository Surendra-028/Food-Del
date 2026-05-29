import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import './Additem.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const Additem = ({url}) => {

    const [image, setImage] = useState(false)
    const [data, setData] = useState({
        name : "",
        description : "",
        price : "",
        category : "Salad"
    })

    const handleDataChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data, [name] : value}))
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("category", data.category)
        formData.append("price", Number(data.price))
        formData.append("image", image)
        
        try {
            const response = await axios.post(`${url}/api/food/add`, formData)
            if (response.data.success) {
                setData({
                    name : "",
                    description : "",
                    price : "",
                    category : "Salad"
                })
                setImage(false)
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error("Failed to connect to the server")
        }
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={handleSubmit}>
                <h3>Add Food Item</h3>
                <div className="add-item-image flex-col">
                    <p>Food Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} name="image" hidden required />
                </div>
                <div className="add-item-name flex-col">
                    <p>Food Name</p>
                    <input type="text" onChange={handleDataChange} value={data.name} name="name" placeholder='noodles' required/>
                </div>
                <div className="add-item-description">
                    <p>Food Description</p>
                    <textarea onChange = {handleDataChange} value = {data.description} name="description" placeholder='Write content here' required></textarea>
                </div>
                <div className="add-item-category-prices">
                    <div className="add-item-category flex-col">
                        <p>Select Category</p>
                        <select name="category" onChange={handleDataChange} value = {data.category}>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Desert">Desert</option>
                            <option value="Noodles">Noodles</option>
                            <option value="Cake">Cake</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Pure Veg">Pure Veg</option>
                        </select>
                    </div>
                    <div className="add-item-price">
                        <p>Food Price</p>
                        <input type="Number" onChange = {handleDataChange} value = {data.price} placeholder = '$20'name="price" required/>
                    </div>
                </div>
                <button type="submit" className='add'>
                    Add
                </button>
            </form>
        </div>
    )
}

export default Additem