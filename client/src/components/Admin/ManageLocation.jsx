import Sidebar from "../../elements/sidebar/sidebar.jsx";
import Navbar from "../../elements/navbar/navbar.jsx";
import Datatable from "../../elements/datatable/Datatable";

const ManageLocation = () => {
    return (
      <div className = "list">
          <Sidebar/>
          <div className = "listContainer">
              <Navbar/>
              <Datatable/>
          </div>
      </div>
    )
  }
  
  export default ManageLocation;