import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Headers/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

const Home = () => {

  const [category, setCategory] = useState("All")

  return (
    <>
    <div className='home'>
      <Header />
      <ExploreMenu category = {category} setCategory = {setCategory}/>
    </div>
    <FoodDisplay category = {category} setCategory = {setCategory}/>
    </>
  )
}

export default Home
