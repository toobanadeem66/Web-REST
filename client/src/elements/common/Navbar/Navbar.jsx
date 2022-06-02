import "./Navbar.scss"
import {Link} from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState,useEffect } from "react";
import {updateProfile,getProfile} from "../../../API calls/Restaurants";
import {Navigate} from 'react-router-dom';

function Navbar() {

  const id =localStorage.getItem("CRID")   
  const[restaurant,setRestuarant] =useState([]);
  const[logo,setlogo] =useState("");
  const token = localStorage.getItem("Ctoken");
  const [navigate, setNavigate] = useState(false);
  const [logged, setLogged] = useState(true);
  


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


  const logout = async () => {
    localStorage.removeItem("Ctoken");
    localStorage.removeItem("CrefreshToken");
    
    setNavigate(true);
}
if (navigate) {
  return <Navigate to="/CustomerLogin"/>;
}

const cartAlert = () => {
 
    if(!token){
      setLogged(false)
      alert("Please Login")
      // return <Navigate to="/CustomerLogin"/>
    }
  

}


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
          {
           !token &&
          <Link to = "/CustomerLogin">
          <div className="item">
            Login
          </div>
          </Link>
          }
          {
            !token &&
          <Link to = "/CustomerRegister">
          <div className="item">
            Register
          </div>
          </Link>
          }

{ 
          token &&
          <Link to = "/CustomerLogin" onClick={logout}>
          <div className="item">
           Logout
          </div>
          </Link>
          }

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