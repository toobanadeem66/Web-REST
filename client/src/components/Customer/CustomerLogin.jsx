import React from 'react'
import { useState } from "react";
import Navbar from '../../elements/common/Navbar/Navbar'
import "./customerlogin.scss"
import axios from 'axios'
import Api from "../../API calls/Api";


 const CustomerLogin = () => {
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
			var url = "http://localhost:3000/auth/login";
			 await axios.post(url, data, config).then((response) => {
                 var data = response.data
                console.log(response.status);
                console.log(data.accessToken);
                

				if (data.role==='customer') {

                localStorage.setItem("Ctoken", JSON.stringify(data.accessToken));
                localStorage.setItem('CrefreshToken', JSON.stringify(data.refreshToken))
                localStorage.setItem("CRID", JSON.stringify(data.RID));
                localStorage.setItem("User_ID", JSON.stringify(data.User_ID));
				alert('Login successful')
                window.location = "/CustomerHome";
				}
				else {
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
    <div className='CustomerLogin_Container'>
        <div className="header">
            <Navbar/>
        </div>
       

        <div class="login-box">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
            <div className="textbox">
                <i className="fas fa-user"></i>
                <input type="email" name="email" placeholder="Email" required  onChange={handleChange} value={data.email}/>
            </div>

            <div className="textbox">
                <i className="fas fa-lock"></i>
                <input type="password" name="password" placeholder="Password" onChange={handleChange}  value={data.password}/>
            </div>
            {error && <div className="error_msg">{error}</div>}
        <input type="submit" className="btn" value="Login"/>
        <p> Forgot your password? Click here</p>
        </form>
        </div>
       


    </div>
  )
}

export default CustomerLogin