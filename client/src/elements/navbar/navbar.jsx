import "./navbar.scss"
import { useState,useEffect } from "react";
import {updateProfile,getProfile} from "../../API calls/Restaurants";

const Navbar = () => {
  const id =localStorage.getItem("RID") 
  const username = JSON.parse(localStorage.getItem("User_Name")  )

  const[restaurant,setRestuarant] =useState([]);
  const[logo,setlogo] =useState("");
  
  const [user, setUser] = useState("");
  useEffect(() => {
    const view2 = async () => {
     getProfile().then((response)=>{
       setRestuarant(response.data.products)
     
     })

   
    
    }
    view2()
  }, [])

  useEffect(() => {

      setUser(username)
  },[])

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
    <div className="navbarAdmin">
      <div className="wrapper">
       
        <div className="items">
      
        <div className="item">
            Welcome {user}   
          </div>


          <div className="item">
            <img
              src={logo}
              alt=""
              className="avatar"
            />

            
          </div>


        </div>
      </div>
    </div>
  )
}

export default Navbar