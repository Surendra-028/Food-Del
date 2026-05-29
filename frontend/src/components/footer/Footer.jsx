import React from 'react'
import { assets } from '../../assets/assets'
import './Footer.css';

const Footer = () => {
    return (
        <div className='footer' id ='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p> a mobile or web platform connecting hungry customers with local restaurants and grocery stores.  
                         Users can seamlessly browse menus, place orders, make secure payments, and track their food in 
                        real-time straight to their doorstep.
                    </p>
                    <div className="footer-content-left-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul className="footer-content-center-list">
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+1-123-456-7890</li>
                        <li>tomato@gmail.com</li>
                    </ul>
                </div>
            </div>
            <p className='footer-content-last'>Privacy Policy - © 2026 Tomato. All rights reserved.</p>
        </div>
    )
}

export default Footer
