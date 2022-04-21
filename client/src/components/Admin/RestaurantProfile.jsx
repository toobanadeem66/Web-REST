import "./RestaurantProfile.scss"
import Sidebar from "../../elements/sidebar/sidebar.jsx";
import Navbar from "../../elements/navbar/navbar.jsx";

 const RestaurantProfile = () => {
  return (
    <div className="restaurantprofile">
      <Sidebar />
      <div className="restaurantprofile__container">
        <Navbar />
        </div>
    </div>
  )
}

export default RestaurantProfile;