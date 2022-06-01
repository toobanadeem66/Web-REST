import React from 'react'
import Navbar from '../../elements/common/Navbar/Navbar'
import "./customerregister.scss"
import { useState } from "react";
import axios from 'axios'

 const CustomerRegister = () => {
    const [data, setData] = useState({ email: "", password: "" , username: "", address: "", phoneNumber: "", role: "customer", R_ID: 1 });
	const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

    const handleSubmit = async (e) => {
        console.log("hello")
		e.preventDefault();
		try {
            
            const config = {
                headers:{
                    "Content-type": "application/json"
                    
                }
            }
			var url = "http://localhost:3000/auth/register";
			 await axios.post(url, data, config).then((response) => {
                 var data = response.data
                console.log(response.status);
                console.log(data.accessToken);

				alert('Register successful')
                window.location = "/CustomerLogin";


              });

            } catch (error) {
                    alert("Email already exists")
 

            }
        };


  return (

    <div className='CustomerRegister_Container'>
        <div className="header">
            <Navbar/>
        </div>
       

        <div class="login-box">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>

            <div className="textbox">
                <i class="fas fa-user"></i>
                <input type="text" name= "username" placeholder="Full Name" required onChange={handleChange} value={data.username}/>
            </div>

            <div className="textbox">
                <i class="fas fa-lock"></i>
                <input type="email" name= "email" placeholder="Email" required onChange={handleChange} value={data.email}/>
            </div>

            <div className="textbox">
                <i class="fas fa-lock"></i>
                <input type="password" name= "password" placeholder="Password" required onChange={handleChange} value={data.password}/>
            </div>

            <div className="textbox">
                <i className="fas fa-lock"></i>
                <input type="text" name= "phoneNumber" placeholder="Phone Number" required onChange={handleChange} value={data.phoneNumber}/>
            </div>
            
            <div className="textbox">
                <i className="fas fa-lock"></i>
                <input type="text" name = "address" placeholder="Address" required onChange={handleChange} value={data.address}/>
            </div>
            
            {error && <div className="error_msg">{error}</div>}
        <input type="submit" className="btn" value="Register" />
        </form>

        </div>
    

    </div>
  )
}

export default CustomerRegister