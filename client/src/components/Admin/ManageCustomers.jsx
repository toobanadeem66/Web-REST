import Sidebar from "../../elements/sidebar/sidebar.jsx";
import Navbar from "../../elements/navbar/navbar.jsx";
import DatatableCustomers from "../../elements/datatable/DatatableCustomers";

const ManageCustomer = () => {
    return (
      <div className = "list">
          <Sidebar/>
          <div className = "listContainer">
              <Navbar/>
              <DatatableCustomers/>
          </div>
      </div>
    )
  }
  
  export default ManageCustomer;