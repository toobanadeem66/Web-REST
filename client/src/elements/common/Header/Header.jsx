import React from 'react'
import "./header.scss"
import {useState,useEffect } from 'react'
import {updateProfile,getProfile} from "../../../API calls/Restaurants";

const Header = () => {
  const id =localStorage.getItem("CRID")   
  const[name,setname]=useState("");
  
  const[restaurant,setRestuarant] =useState([]);


  useEffect(() => {
    const view2 = async () => {
     getProfile().then((response)=>{
       setRestuarant(response.data.products)     
     })
    
    }
    view2()
  }, [])

  useEffect(() => {
    const view = async () => {     
       console.log(restaurant)
       for (var item in restaurant){
         if(restaurant[item].R_ID == id){
        
        setname(restaurant[item].R_name)
        
       
         }
        }    
    }
    view()
  }, [restaurant])

  return (
    <div className="Header_Container">  
        <img
          className="header_img"
          src="https://www.adventureconnections.co.uk/wp-content/uploads/2018/03/Restaurant-Booking-Service-header.jpg"
          alt=""
        />
        <h1 className="Header title">Welcome to {name} </h1>
        
        </div>
  )
}

export default Header