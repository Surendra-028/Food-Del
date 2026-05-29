import React from 'react'
import { menu_list } from '../../assets/assets'
import './ExploreMenu.css'

const ExploreMenu = ({category, setCategory}) => {

    return (
        <div className='explore-menu' id= "explore-menu">
            <h3>Menu List</h3>
            <p className='explore-menu-text'>a structured fine-dining experience consisting of seven 
                distinct dishes served in a specific progression. Each course is portioned to 
                balance the meal, guiding diners through a journey of flavors, 
                textures, and temperatures from light starters to rich mains and a sweet finish</p>
            <ul className="explore-menu-list">
                {menu_list.map((dish, index) => (
                    <li onClick = {() => setCategory(prev => prev === dish.menu_name ? "All" : dish.menu_name)}key={index}>
                        <div className="explore-menu-list-item">
                            <img className = {category === dish.menu_name ? "active" : ""} src={dish.menu_image} alt="" />
                            <h5>{dish.menu_name}</h5>
                        </div>
                    </li>
                ))}
            </ul>
            <hr />
        </div>

    )
}

export default ExploreMenu
