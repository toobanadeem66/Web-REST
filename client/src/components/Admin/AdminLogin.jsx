import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AdminLogin.scss";

const AdminLogin = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const config = {
				headers: {
					"Content-type": "application/json"

				}
			}
			const url = "http://localhost:3000/auth/login";
			await axios.post(url, data, config).then((response) => {
				var data = response.data
				console.log(data)
				console.log(response.status);
				console.log(data.accessToken);


				if (data.role === 'admin') {

					localStorage.setItem("token", JSON.stringify(data.accessToken));
					localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken))
					localStorage.setItem("RID", JSON.stringify(data.RID));
					alert('Login successful')
					window.location = "/ManageProduct";
				}
				else {
					//console.log(data.role)
					alert('Please check your username and password')
				}
			});

			// console.log(data)
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500

			) {
				setError(error.response.data.message);
				console.log(error.response)
			}
		}
	};

	return (
		<div className="login">
			<div className="login_container">
				<div className="login_form_container">
					<div className="Admin_left">
						<form className="form_container" onSubmit={handleSubmit}>
							<h1>Login to Your Account</h1>
							<input
								type="email"
								placeholder="Email"
								name="email"
								onChange={handleChange}
								value={data.email}
								required
								className="Admin_input"
							/>
							<input
								type="password"
								placeholder="Password"
								name="password"
								onChange={handleChange}
								value={data.password}
								required
								className="Admin_input"
							/>
							{error && <div className="error_msg">{error}</div>}
							<button type="submit" className="green_btn">
								LOGIN
							</button>
						</form>
					</div>

				</div>
			</div>

		</div>
	);
};

export default AdminLogin;