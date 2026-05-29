import React, { useContext, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './Verify.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const { url } = useContext(StoreContext)
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
            const response = await axios.post(`${url}/api/order/verify`, { success, orderId })
            console.log(response.data.success)
            if (response.data.success) {
                navigate("/myorders")
            } else {
                navigate("/")
            }
        } catch (error) {
            console.error("Verification error:", error)
            navigate("/")
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [])

    return (
        <div className='verify'>
            <div className="sinners">
                my-orders
            </div>
        </div>
    )
}

export default Verify