import "./RestaurantProfile.scss"
import Sidebar from "../../elements/sidebar/sidebar.jsx";
import Navbar from "../../elements/navbar/navbar.jsx";
import { useState,useEffect } from "react";
import {updateProfile,getProfile} from "../../API calls/Restaurants";


 const RestaurantProfile = () => {

  const id =localStorage.getItem("RID")   
  const [data, setData] = useState({ R_name: "", R_loc: "" , R_About:"",R_History:"",R_logo:""});
	const [error, setError] = useState("");
  const[restaurant,setRestuarant] =useState([]);
  const[rid,setRid] =useState("");
  const[logo,setlogo] =useState("");
  const[name,setname]=useState("");
  const[loc,setloc]=useState("");
  const[about,setabout]=useState("");
  const[history,sethistory]=useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

  const handleSubmit = async (e) => {
    
    updateProfile(rid,data).then((response)=>{
      console.log(response.data)
    })

  }

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
        setRid(restaurant[item]._id)
        setlogo(restaurant[item].R_logo)
        setname(restaurant[item].R_name)
        sethistory(restaurant[item].R_History)
        setabout(restaurant[item].R_About)
        setloc(restaurant[item].R_loc)
              
         }
        }    
    }
    view()
  }, [restaurant])

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="Restaurant_Container">
          <div className="Restaurant_Container_Header">
            <h2 className="editprofile_h2"> EDIT INFORMATION </h2>
            </div>
            <div className="Restaurant_Container_Body">
            <div className="left_container">
              <div className="restaurant_logo_container">
                <img className = "restaurant_logo" src={logo} alt="logo" />
              </div>
              <button className="changelogo_btn"> CHANGE </button>
              <button className="deletelogo_btn"> DELETE </button>
            </div>
            <div className="right_container">
              <div className="editInformation_form_container">
              <h3>Account Details</h3>
              <form className="editInformation_form" onSubmit={handleSubmit}>
                
              <input
							type="text"
							placeholder={name}
							name="R_name"
              onChange={handleChange}
              value={data.R_ID}
							required
							className="Admin_input"
						/>
						<input
							type="text"
							placeholder={loc}
							name="R_loc"
              onChange={handleChange}
              value={data.R_loc}
							required
							className="Admin_input"
						/>
            	<input
							type="text"              
							placeholder={about}
							name="R_About"
              onChange={handleChange}
              value={data.R_About}
							required
							className="Admin_input"
						/>
						<input
							type="textbox"
							placeholder={history}
							name="R_History"
              onChange={handleChange}
              value={data.R_History}
							required
							className="Admin_input"
						/>
            	<input
							type="text"
							placeholder={logo}
							name="R_logo"
              onChange={handleChange}
							value={data.R_logo}
              required
							className="Admin_input"
						/>
						<button type="submit" className="green_btn">
							SAVE
						</button>

             </form>

              </div>

              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default RestaurantProfile;