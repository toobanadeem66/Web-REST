import Sidebar from "../../elements/sidebar/sidebar.jsx";
import Navbar from "../../elements/navbar/navbar.jsx";
import Datatable from "../../elements/datatable/Datatable";
import "./ManageCategory.scss";

const ManageCategory = () => {
    return (
      <div className = "category">
          <Sidebar/>
          <div className = "listContainer">
              <Navbar/>
              <Datatable/>
          </div>
      </div>
    )
  }
  
  export default ManageCategory;