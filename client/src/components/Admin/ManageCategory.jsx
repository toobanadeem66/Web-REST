import Sidebar from "../../elements/sidebar/sidebar.jsx";
import Navbar from "../../elements/navbar/navbar.jsx";
import DatatableCategory from "../../elements/datatable/DatatableCategory.jsx";
import "./ManageCategory.scss";

const ManageCategory = () => {
    return (
      <div className = "list">
          <Sidebar/>
          <div className = "listContainer">
              <Navbar/>
              <DatatableCategory/>
          </div>
      </div>
    )
  }
  
  export default ManageCategory;