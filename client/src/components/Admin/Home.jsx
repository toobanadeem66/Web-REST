import "./Home.scss"
import Sidebar from "../../elements/sidebar/sidebar.jsx";
import Navbar from "../../elements/navbar/navbar.jsx";
import Widget from "../../elements/widgets/widgets.jsx";
import Featured from "../../elements/featured/Featured";
import Chart from "../../elements/chart/Chart.jsx";
import Table from "../../elements/table/Table.jsx";
const AdminHome = () => {
  return (
    <div className="home">
     <Sidebar/>
     <div className="homeContainer">
       <Navbar/>
        <div className="widgets">
          <Widget type = "user"/>
          <Widget type = "order"/>
          <Widget type = "earning"/>
          <Widget type = "balance"/>
        </div>

        <div className="charts">
          <Featured/>
          <Chart/>
        </div>
        <div className="listContainer">
          <div className="listTitle">
            <Table/>
          </div>
        </div>
        </div>
    </div>
    )
  };

export default AdminHome;
