import "./sidebar.scss"
import {Link} from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CategoryIcon from '@mui/icons-material/Category';
import EditLocationAltOutlinedIcon from '@mui/icons-material/EditLocationAltOutlined';
import {Navigate} from 'react-router-dom';
import React, {useState,useEffect } from 'react'
import {updateProfile,getProfile} from "../../API calls/Restaurants";

const Sidebar = () => {
  const id =localStorage.getItem("RID")   
  const[name,setname]=useState("");
  const [navigate, setNavigate] = useState(false);
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

  const logout = async () => {
    window.localStorage.clear();
    setNavigate(true);
}

if (navigate) {
  return <Navigate to="/login"/>;
}

  return (
    <div className="sidebar">
      <div className="top"> 

      <span className="logo"> {name} </span>

      </div> 

      <hr/>  

      <div className="center">
        <ul>
          <p className="title"> MAIN </p>
         
         {/* <Link to= "/dashboard" style={{ textDecoration: "none" }} >
          <li>
            <DashboardIcon className="icon"/>
            <span> Dashboard </span>
          </li>
          </Link>
          <p className="title"> LISTS </p>
          <Link to= "/ManageLocation" style={{ textDecoration: "none" }} >
          <li>
            <EditLocationAltOutlinedIcon className="icon" />
            <span> Delivery Locations </span>
          </li>
          </Link> */}

          <Link to = "/ManageCategory" style={{ textDecoration: "none" }}>
          <li>
            <CategoryIcon  className="icon"/>
            <span> Manage Category </span>
          </li>
          </Link>

          <Link to= "/users" style={{ textDecoration: "none" }} >
          <li>
            <PersonOutlineOutlinedIcon className="icon"/>
            <span> Manage Customers </span>
          </li>
          </Link>
          <Link to = "/ManageProduct" style={{ textDecoration: "none" }}>
          <li>
            <StoreIcon className="icon"/>
            <span> Manage Product </span>
          </li>
          </Link>

          <Link to = "/ManageOrder" style={{ textDecoration: "none" }}>
          <li>
            <CreditCardIcon className="icon"/>
            <span> View Orders </span>
          </li>
          </Link>

          <p className="title"> USER </p>
          <Link to = "/RestaurantProfile"  style={{ textDecoration: "none" }}>
          <li>
            <AccountCircleOutlinedIcon className="icon"/>
            <span> Restaurant Profile </span>
          </li>
          </Link>
          <Link to = "/login" onClick={logout} style={{ textDecoration: "none" }}>
          <li>
            <ExitToAppIcon className="icon" />
            <span> Logout </span>
          </li>
              </Link>  
        </ul>
      </div>    
     

   </div>
  )
}

export default Sidebar