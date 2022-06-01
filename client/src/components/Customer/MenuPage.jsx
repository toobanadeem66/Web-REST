import React from 'react';
import Navbar from '../../elements/common/Navbar/Navbar';
import Header from '../../elements/common/Header/Header';
import Slider from "../../elements/common/CategorySlider/Slider";
import Products from "../../elements/common/Menu/Products.jsx";
import "./Menu.scss";


export function getCatName({item}) {
  var catName = item;
  console.log(item)
  
}


const Home = () => {



  return (

   
   <div className = "Menu_Container">
    <div className="CustomNavbar"> 
    <Navbar/> 
   </div>

       <div className="Menu_header">
        <Header/>
       </div>

         <div className="Menu_slider">
            <Slider/>
            </div>
            <Products title = "Main Course"/>
            <Products title = "Side Dish"/>
            <Products title = "Dessert"/>
            <Products title = "Drinks"/>

 

      

        

  </div>

  )
}
export default Home;