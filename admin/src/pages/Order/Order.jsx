import React from 'react'
import './Order.css'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import axios from 'axios'

const Order = ({ url }) => {

    const [data, setData] = useState([])

    const fetchAllOrderItems = async () => {
        try {
            const response = await axios.get(`${url}/api/order/list`)
            if (response.data.success) {
                setData(response.data.data)
            } else {
                toast.error("Error fetching orders")
            }
        } catch (error) {
            console.error(error)
            toast.error("Server error")
        }
    }

    const statusHandler = async (event, orderId) => {
        try {
            const response = await axios.post(`${url}/api/order/status`, {
                orderId,
                status: event.target.value
            })
            if (response.data.success) {
                await fetchAllOrderItems()
                toast.success("Order status updated")
            } else {
                toast.error("Could not update status")
            }
        } catch (error) {
            console.error(error)
            toast.error("Server error")
        }
    }

    useEffect(() => {
        fetchAllOrderItems();
    }, [])

    return (
        <div className='order add'>
            <h3>Order Page</h3>
            <div className="order-list">
                {data.length === 0 ? (
                    <p className="no-orders">No orders placed yet.</p>
                ) : (
                    data.map((order, index) => (
                        <div key={index} className='order-item'>
                            <div className="order-icon-box">📦</div>
                            
                            <div className="order-details">
                                <p className='order-item-food'>
                                    {order.items.map((item, idx) => {
                                        if (idx === order.items.length - 1) {
                                            return item.name + " x " + item.quantity
                                        } else {
                                            return item.name + " x " + item.quantity + ", "
                                        }
                                    })}
                                </p>
                                <p className='order-item-name'>
                                    {order.Address.firstName + " " + order.Address.lastName}
                                </p>
                                <div className='order-item-address'>
                                    <p>{order.Address.street + ","}</p>
                                    <p>{order.Address.city + ", " + order.Address.state + ", " + order.Address.country + ", " + order.Address.pincode}</p>
                                </div>
                                <p className='order-item-phone'>{order.Address.phone}</p>
                            </div>

                            <p className="order-item-count">Items: {order.items.length}</p>
                            
                            <p className="order-item-price">₹{order.amount}</p>

                            <select 
                                onChange={(e) => statusHandler(e, order._id)} 
                                value={order.status || "Food Processing"}
                                className="order-status-select"
                            >
                                <option value="Food Processing">Food Processing</option>
                                <option value="Out for delivery">Out for delivery</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Order