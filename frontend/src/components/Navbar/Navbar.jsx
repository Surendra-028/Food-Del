import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets.js";
import "./Navbar.css";
import { StoreContext } from "../../context/StoreContext.jsx";

const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState("home");
    const { totalPriceOfItems, token, setToken } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };

    return (
        <div className="navbar">
            <Link to="/">
                <img src={assets.logo} alt="" className="logo" />
            </Link>

            <ul className="navbar-menu">
                <Link
                    to="/"
                    onClick={() => setMenu("home")}
                    className={menu === "home" ? "active" : ""}
                >
                    home
                </Link>
                <a
                    href="#explore-menu"
                    onClick={() => setMenu("menu")}
                    className={menu === "menu" ? "active" : ""}
                >
                    menu
                </a>
                <a
                    href="#app-download"
                    onClick={() => setMenu("mobile-app")}
                    className={menu === "mobile-app" ? "active" : ""}
                >
                    mobile-app
                </a>
                <a
                    href="#footer"
                    onClick={() => setMenu("contact-us")}
                    className={menu === "contact-us" ? "active" : ""}
                >
                    contact us
                </a>
            </ul>

            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <Link to="/cart">
                        <img src={assets.basket_icon} alt="" />
                    </Link>
                    {totalPriceOfItems() > 0 ? <div className="dot"></div> : null}
                </div>
                {!token ? (
                    <button onClick={() => setShowLogin(true)}>sign in</button>
                ) : (
                    <div className="profile-place">
                        <img src={assets.profile_icon} alt="" />
                        <ul className="profile-items">
                            <Link to = '/myorders'>
                                <li>
                                    <img src={assets.bag_icon} alt="" />
                                    <p>Orders</p>
                                </li>
                            </Link>
                            <hr />
                            <li onClick={handleLogout}>
                                <img src={assets.logout_icon} alt="" />
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;