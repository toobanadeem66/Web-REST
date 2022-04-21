import Sidebar from "../../elements/sidebar/sidebar.jsx";
import Navbar from "../../elements/navbar/navbar.jsx";
import Datatable from "../../elements/datatable/Datatable";

const ManageCustomer = () => {
    return (
      <div className = "customer">
          <Sidebar/>
          <div className = "listContainer">
              <Navbar/>
              <Datatable/>
          </div>
      </div>
    )
  }
  
  export default ManageCustomer;