import React from 'react'
import './MyOrders.css'
import { useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useEffect } from 'react'

const MyOrders = () => {

    const [data, setData] = useState([])
    const { url, token } = useContext(StoreContext)

    const fetchOrderDetails = async () => {
        try {
            const response = await axios.get(url + "/api/order/myorders", { headers: { token } })
            if (response.data.success) {
                setData(response.data.data)
            }
        } catch (error) {
            console.error("Error fetching orders:", error)
        }
    }

    useEffect(() => {
        if (token) {
            fetchOrderDetails();
        }
    }, [token])

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.length === 0 ? (
                    <p className="no-orders">You haven't placed any orders yet.</p>
                ) : (
                    data.map((order, index) => (
                        <div key={index} className='order-card'>
                            <div className="order-icon">📦</div>
                            
                            <div className="order-items">
                                <p>
                                    {order.items.map((item, idx) => {
                                        if (idx === order.items.length - 1) {
                                            return item.name + " x " + item.quantity
                                        } else {
                                            return item.name + " x " + item.quantity + ", "
                                        }
                                    })}
                                </p>
                            </div>

                            <div className="order-amount">
                                <span>Total Amount:</span>
                                <strong>₹{order.amount}.00</strong>
                            </div>

                            <div className="order-status">
                                <span className={`status-dot ${order.payment ? 'paid' : 'paid'}`}></span>
                                <span>{order.payment ? 'paid' : 'paid'} & {order.status}</span>
                            </div>

                            <button onClick={fetchOrderDetails} className="track-btn">Track Order</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default MyOrders
