import "./Navbar.scss"
import {Link} from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState,useEffect } from "react";
import {updateProfile,getProfile} from "../../../API calls/Restaurants";

function Navbar() {

  const id =localStorage.getItem("RID")   
  const[restaurant,setRestuarant] =useState([]);
  const[logo,setlogo] =useState("");
  

 var cart = JSON.parse(localStorage.getItem("cart"));
  var cartCount = cart ? cart.length : 0
  console.log(typeof cart)


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
        setlogo(restaurant[item].R_logo)
         }
        }    
    }
    view()
  }, [restaurant])


  return (
    <div className="navbar">
      <div className="wrapper">

        <div className="logo">
          <Link to="/CustomerHome">
          <img className = "logo_img" src={logo}/>
          </Link>
        </div>


        <div className="items">
          <Link to = "/Menu">
          <div className="item">
            Menu
          </div>
          </Link>
          <Link to = "/CustomerLogin">
          <div className="item">
            Login
          </div>
          </Link>
          <Link to = "/CustomerRegister">
          <div className="item">
            Register
          </div>
          </Link>

          <Link to = "/">
          <div className="item">
            About
          </div>

          </Link>

          <Link to = "/cart">
          <div className="item">
            <ShoppingCartIcon/>
            <span className="option">
               {cartCount} 
              
            </span>
          </div>
          </Link>

        </div>
      </div>
    </div>
  )
}


export default Navbar