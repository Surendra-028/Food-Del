import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {

  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favorite food here</h2>
        <p>
            service where ready-to-eat meals or groceries are 
            transported from a restaurant or store directly to a customer
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;