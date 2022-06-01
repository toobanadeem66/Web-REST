import "./Navbar.scss"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import {Link} from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useStateValue } from "../../../redux/StateProvider";



  


function Navbar() {

 var cart = JSON.parse(localStorage.getItem("cart"));
  var cartCount = cart ? cart.length : 0
  console.log(typeof cart)


  return (
    <div className="navbar">
      <div className="wrapper">

        <div className="logo">
          <Link to="/CustomerHome">
          <img className = "logo_img" src="https://s.tmimgcdn.com/scr/800x500/212900/spoon-and-fork-restaurant-logo_212966-original.png" alt="logo" />
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