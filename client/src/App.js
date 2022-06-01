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
import ManageCustomers from "./components/Admin/ManageCustomers"
import CustomerHome from "./components/Customer/CustomerHome.jsx";
import MenuPage from "./components/Customer/MenuPage.jsx";
import CustomerLogin from "./components/Customer/CustomerLogin";
import CustomerRegister from "./components/Customer/CustomerRegister";
import Cart from "./components/Customer/Cart";


function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			<Route path="/AdminLogin" exact element={< AdminLogin />} />
			<Route path="/login" exact element={<AdminLogin />} />

			{/* <Route path="/dashboard" >
				{ user && <Route index element={< AdminHome />} />}
				{!user && <Route index element = {"404 NOT FOUND"} /> }
			</Route> */}

			<Route path="/ManageProduct" >
				{user && <Route index element={<ManageProduct />} />}
				{!user && <Route index element = {"404 NOT FOUND"} /> }
			</Route>

			<Route path="/ManageLocation">
				{user && <Route index element={< ManageLocation />} />}
				{!user && <Route index element = {"404 NOT FOUND"} /> }
			</Route>

			<Route path="/users">
				{user && <Route index element={<ManageCustomers />} />}
				{!user && <Route index element = {"404 NOT FOUND"} /> }
			</Route>
			
			<Route path="/ManageOrder">
				{user && <Route index element={<ViewOrders />} />}
				{!user && <Route index element = {"404 NOT FOUND"} /> }
			</Route>

			<Route path="/ManageCategory">
				{user && <Route index element={<ManageCategory />} />}
				{!user && <Route index element = {"404 NOT FOUND"} /> }
			</Route>

			<Route path="/RestaurantProfile">
				{user && <Route index element={<RestaurantProfile />} />}
				{!user && <Route index element = {"404 NOT FOUND"} /> }
			</Route>

			<Route path="/CustomerHome">
				{ <Route index element={<CustomerHome />} />}
				{/* {!user && <Route index element = {"404 NOT FOUND"} /> } */}
			</Route>

			<Route path="/Menu">
				{ <Route index element={<MenuPage/>} />}
				{/* {!user && <Route index element = {"404 NOT FOUND"} /> } */}
			</Route>

			<Route path="/CustomerLogin">
				{<Route index element={<CustomerLogin/>} />}
				{/* {!user && <Route index element = {"404 NOT FOUND"} /> } */}
			</Route>

			<Route path="/CustomerRegister">
				{ <Route index element={<CustomerRegister/>} />}
				{/* {!user && <Route index element = {"404 NOT FOUND"} /> } */}
			</Route>

			<Route path="/cart">
				{<Route index element={<Cart/>} />}
				{/* {!user && <Route index element = {"404 NOT FOUND"} /> } */}
			</Route>



			<Route path ="*" exact element={"404 NOT FOUND"} /> 

			{/* <Route path="/login" exact element={<Login />} /> */}
			{/* {user && <Route path="/homepage" exact element={<Main />} />} */}
			{/* <Route path="/signup" exact element={<Signup />} /> */}

			{/* <Route path="/" element={<Navigate replace to="/login" />} /> */}

		</Routes>

	);
}

export default App;
