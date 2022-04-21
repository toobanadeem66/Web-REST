import {useState} from 'react'
import styles from './styles.module.css'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'


const Signup = () => {
    const [data, setData] = useState({
        username: "",
        password: "",
        phoneNumber: "",
        email: "",
        address: "",
        role: "customer" ,
        R_ID: 1
    })
    const [error, setError] = useState("")
     const navigate = useNavigate();

     const handleChange = ({currentTarget:input}) => {
        setData({...data, [input.name]: input.value});
     }

     const handleSubmit = async(e) => {
         e.preventDefault();
         try {
            const config = {
                headers:{
                    "Content-type": "application/json"
                }
            }
            const url = "http://localhost:3000/auth/register"
            console.log(data)
            await axios.post(url,data,config).then( (response) =>{
                console.log(response.message);
                localStorage.setItem("token", data);
                
                navigate("/login")

            }
            

            );


         } catch (error){
            if(error.response && 
                error.response.status >= 400 && 
                error.response.status <= 500 ){
                    setError(error.response.data.message)
                    console.log(error)
                }
         }
     }
    return (
        <div className = {styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className= {styles.left}> 
                    <h1> Welcome Back </h1>
                    <Link to = "/login">
                        <button type = "button" className={styles.white_btn}>
                            Sign In 
                        </button>
                    </Link>
                
                </div>
                <div className= {styles.right}> 
                    <form className={styles.form_container} onSubmit={handleSubmit} > 
                        <h1> Create Account </h1>

                        <input type = "text"
                               placeholder='name'
                               name = "username"
                               defaultValue ={data.username}
                               onChange = {handleChange}
                               required
                               className={styles.input}/>

                        <input type = "password"
                               placeholder='password'
                               name = "password"
                               value ={data.password}
                               onChange = {handleChange}
                               required
                               className={styles.input}/> 

                        <input type = "tel"
                               placeholder='phone number'
                               name= "phoneNumber"
                               defaultValue ={data.phoneNumber}
                               onChange = {handleChange}
                               required
                               className={styles.input}/>   

                        <input type = "email"
                               placeholder='email'
                               name= "email"
                               value ={data.email}
                               onChange = {handleChange}
                               required
                               className={styles.input}/>

                        <input type = "text"
                               placeholder='address'
                               name = "address"
                               value ={data.address}
                               onChange = {handleChange}
                               required
                               className={styles.input}/>

                    
                        {error && <div className ={styles.error.msg} > {error} </div>}
                        <button type= "submit" className={styles.green_btn} >
                            Sign Up
                        </button>
                    
                    </form>
                
                </div>

            </div>
        </div>
    );
};

export default Signup;