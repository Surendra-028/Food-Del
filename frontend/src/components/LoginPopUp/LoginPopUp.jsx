import React, { useContext, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'

const LoginPopUp = ({ setShowLogin }) => {

    const [currentState, setCurrentState] = useState("Sign In")

    const [data, setData] = useState({})

    const {url, token, setToken} = useContext(StoreContext)

    const handleInputData = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const handleSubmitInput = async (event) => {
        event.preventDefault()

        try {
            const formData = new FormData()

            if (currentState === "Sign In") {
                formData.append("email", data.email)
                formData.append("password", data.password)

                const response = await axios.post(`${url}/api/user/login`, formData)

                if (response.data.success) {
                    setToken(response.data.token)
                    localStorage.setItem("token", response.data.token)
                    toast.success(response.data.message)
                    setShowLogin(false)
                } else {
                    toast.error(response.data.message)
                }
            } else {
                formData.append("fullName", data.name)
                formData.append("email", data.email)
                formData.append("password", data.password)

                const response = await axios.post(`${url}/api/user/register`, formData)

                if (response.data.success) {
                    setToken(response.data.token)
                    localStorage.setItem("token", response.data.token)
                    toast.success(response.data.message)
                    setShowLogin(false)
                } else {
                    toast.error(response.data.message)
                }
            }
        } catch (error) {
            console.error(error)
            const errorMessage = error.response?.data?.message || "Something went wrong. Please try again."
            toast.error(errorMessage)
        }
    }

    return (
        <div className='login-popup' id='login-popup'>
            <form className='login-popup-form' onSubmit={handleSubmitInput}>
                <div className="login-popup-container">
                    <div className="login-popup-title">
                        <p>{currentState}</p>
                        <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <div className="login-popup-items">
                        {currentState === "Sign In" ?
                            <></> :
                            <input type="text" placeholder='Your Name' name="name" value={data.name} onChange={handleInputData} required autoComplete="off" />
                        }
                        <input type="email" name="email" onChange={handleInputData} value={data.email} placeholder='Your Email' required autoComplete="new-password" />
                        <input type="password" name="password" value={data.password} onChange={handleInputData} placeholder='Your Password' required autoComplete="new-password" />
                    </div>
                    <div className="login-popup-checkbox">
                        <div>
                            <input type="checkbox" required />
                            <p>I agree to the Terms and Conditions and Privacy Policy.</p>
                        </div>
                        <div className="login-popup-checkbox-button">
                            <button type="submit">{currentState}</button>
                        </div>
                    </div>
                    <div className="login-popup-conversions">
                        {currentState === "Sign In" ?
                            <p>New User ?
                                <a onClick={() => setCurrentState("Sign Up")}>Sign Up</a> </p>
                            :
                            <p>Already have an account ?
                                <a onClick={() => setCurrentState("Sign In")}>Sign In</a> </p>
                        }
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginPopUp
