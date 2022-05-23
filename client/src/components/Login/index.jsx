import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
            const config = {
                headers:{
                    "Content-type": "application/json"
                    
                }
            }
			const url = "http://localhost:3000/auth/login";
			 await axios.post(url, data, config).then((response) => {
                 var data = response.data
                console.log(response.status);
                console.log(data.accessToken);
                
                localStorage.setItem("token", data);
				
				
                
                window.location = "/dashboard";
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
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							LOGIN
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							REGISTER
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;