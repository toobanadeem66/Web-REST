import Sidebar from "../../elements/sidebar/sidebar.jsx";
import Navbar from "../../elements/navbar/navbar.jsx";
import Datatable from "../../elements/datatable/Datatable.jsx";
import "./ViewOrders.scss";

const ViewOrders = () => {
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

export default ViewOrders