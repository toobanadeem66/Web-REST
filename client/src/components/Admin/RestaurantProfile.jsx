import "./RestaurantProfile.scss"
import Sidebar from "../../elements/sidebar/sidebar.jsx";
import Navbar from "../../elements/navbar/navbar.jsx";

 const RestaurantProfile = () => {
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
                <img className = "restaurant_logo" src="https://www.w3schools.com/howto/img_avatar.png" alt="logo" />
              </div>
              <button className="changelogo_btn"> CHANGE </button>
              <button className="deletelogo_btn"> DELETE </button>
            </div>


            <div className="right_container">
              <div className="editInformation_form_container">
              <h3>Account Details</h3>
              <form className="editInformation_form">
                
              <input
							type="text"
							placeholder="Name"
							name="email"
							required
							className="Admin_input"
						/>
						<input
							type="text"
							placeholder="location"
							name="password"
							required
							className="Admin_input"
						/>
            	<input
							type="text"
              
							placeholder="about"
							name="email"

							required
							className="Admin_input"
						/>
						<input

							type="textbox"
							placeholder="history"
							name="password"

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