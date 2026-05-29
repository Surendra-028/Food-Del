import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/footer/Footer'
import './App.css'
import AppDownload from './components/AppDownload/AppDownload'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'

const App = () => {

    const [showLogin, setShowLogin] = useState(false);

    return (
        <>
        <div className='app'>
            <ToastContainer position = "top-right" autoClose = {2000} style={{ zIndex: 99999 }}/>
            {showLogin ? <LoginPopUp setShowLogin = {setShowLogin} /> : <></>}
            <Navbar setShowLogin = {setShowLogin}/>
            <Routes>
                <Route path='/' element = {<Home />} />
                <Route path='/cart' element = {<Cart />} />
                <Route path='/PlaceOrder' element = {<PlaceOrder />} />
                <Route path='/verify' element = {<Verify />} />
                <Route path = '/myorders' element = {<MyOrders />} />
            </Routes>
            <AppDownload />
        </div>
        <Footer />
        </>
    )
}

export default App
