import Sidebar from "../../elements/sidebar/sidebar.jsx";
import Navbar from "../../elements/navbar/navbar.jsx";
import DatatableOrders from "../../elements/datatable/DatatableOrders";
import "./ViewOrders.scss";

const ViewOrders = () => {
  return (
    <div className = "list">
        <Sidebar/>
        <div className = "listContainer">
            <Navbar/>
            <DatatableOrders/>
            </div>
        </div>
  )
}

export default ViewOrders