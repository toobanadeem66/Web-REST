import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AdminHome from "./components/Admin/Home.jsx";
import AdminLogin from "./components/Admin/AdminLogin.jsx";
import ManageLocation from "./components/Admin/ManageLocation.jsx";
import List from "./components/Admin/List";
import ViewOrders from "./components/Admin/ViewOrders";
import ManageProduct from "./components/Admin/ManageProduct";
import ManageCategory from "./components/Admin/ManageCategory";
import RestaurantProfile from "./components/Admin/RestaurantProfile";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			<Route path="/dashboard" >
		   { user && <Route index element={< AdminHome />} /> } 
		   </Route>

			<Route path="/AdminLogin"  exact element={< AdminLogin />} />
			<Route path="/ManageLocation"  exact element={< ManageLocation />} />	
			
			<Route path="/login" exact element={<AdminLogin />} />

			<Route path="/users">
              <Route index element={<List />} />
			  </Route>

			<Route path="/ManageOrder" exact element={<ViewOrders />} />
			<Route path ="/ManageProduct" exact element={<ManageProduct />} />
			<Route path="/ManageCategory" exact element={<ManageCategory />} />		  
			<Route path ="/RestaurantProfile" exact element={<RestaurantProfile />} />











			{/* <Route path="/login" exact element={<Login />} /> */}
			{/* {user && <Route path="/homepage" exact element={<Main />} />} */}
			{/* <Route path="/signup" exact element={<Signup />} /> */}
			
			{/* <Route path="/" element={<Navigate replace to="/login" />} /> */}

		</Routes>
		
	);
}

export default App;
