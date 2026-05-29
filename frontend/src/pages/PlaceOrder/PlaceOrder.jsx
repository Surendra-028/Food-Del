import React, { useContext, useState } from 'react'
import axios from 'axios'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useAsyncError, useNavigate } from 'react-router-dom'
import { useDebugValue } from 'react'
import { useEffect } from 'react'

const PlaceOrder = () => {

    const { totalPriceOfItems, food_list, cartItems, url, token } = useContext(StoreContext)

    const [data, setData] = useState({
        firstName : "",
        lastName : "",
        email : "",
        phone : "",
        city : "",
        state : "",
        street : "",
        country : "",
        pincode : ""
    })

    const navigate = useNavigate();

    const handleInputChange = async (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prev => ({...prev, [name] : value}))
    }

    const handleSubmitInput = async (event) => {
        event.preventDefault()
        if (cashOnDelivery === "true") {
            navigate("/myorders")
        }
        let orderItems = []
        
        food_list.forEach((food) => {
            if (cartItems[food._id] > 0) {
                let itemInfo = { ...food, quantity: cartItems[food._id] }
                orderItems.push(itemInfo)
            }
        })

        let OrderData = {
            items : orderItems,
            Address : data,
            amount : totalPriceOfItems() + 2,
        }

        try {
            const response = await axios.post(`${url}/api/order/place`, OrderData, { headers : {token}})
            if (response.data.success) {
                if (cashOnDelivery === true) {
                    navigate("/myorders")
                }
                const {session_url} = response.data;
                window.location.replace(session_url)
            } else {
                alert("Error placing order")
            }
        } catch (error) {
            console.error("API error:", error)
            alert("Something went wrong. Please try again.")
        }
    }


    useEffect(() => {
        if (!token) {
            navigate('/cart')
        } else if (totalPriceOfItems() === 0) {
            navigate('/cart')
        }
    }, [token])

    return (
        <div className='PlaceOrder'>
            <form onSubmit={handleSubmitInput}>
                <div className="delivery-address">
                    <div className="delivery-address-left">
                        <div className="delivery-address-multi-fields">
                            <input required onChange = {handleInputChange} name = "firstName" value = {data.firstName} type="text" placeholder='First Name' />
                            <input required onChange = {handleInputChange} name = "lastName" value = {data.lastName} type="text" placeholder='Last Name' />
                        </div>
                        <div className="delivery-address-multi-fields">
                            <input required onChange = {handleInputChange} name = "email" value = {data.email} type="email" placeholder='Email' />
                            <input required onChange = {handleInputChange} name = "phone" value = {data.phone} type="text" placeholder='Phone' />
                        </div>
                        <div className="delivery-address-multi-fields">
                            <input required onChange = {handleInputChange} name = "street" value = {data.street} type="text" placeholder='Street' />
                            <input required onChange = {handleInputChange} name = "city" value = {data.city} type="text" placeholder='City' />
                        </div>
                        <div className="delivery-address-multi-fields">
                            <input required onChange = {handleInputChange} name = "state" value = {data.state} type="text" placeholder='State' />
                            <input required onChange = {handleInputChange} name = "country" value = {data.country} type="text" placeholder='Country' />
                        </div>
                        <input required onChange = {handleInputChange} name = "pincode" value = {data.pincode} type="text" placeholder='Pin Code' />
                    </div>
                    <div className="delivery-address-right">
                        <div className="cart-total">
                            <h2>Cart Totals</h2>
                            <div>
                                <div className="cart-total-details">
                                    <p>Subtotal</p>
                                    <p>${totalPriceOfItems()}</p>
                                </div>
                                <hr />
                                <div className="cart-total-details">
                                    <p>Delivery Fee</p>
                                    <p>${2}</p>
                                </div>
                                <hr />
                                <div className="cart-total-details">
                                    <b>Total</b>
                                    <b>${totalPriceOfItems() + 2}</b>
                                </div>
                            </div>
                            <button type='submit'>PROCEED TO PAYMENT</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PlaceOrder