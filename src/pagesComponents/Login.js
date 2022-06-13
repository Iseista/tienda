import axios from 'axios';
import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import"../styles/Login.css"

const Login = () => {


    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const submit = data=> {

        axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/users/login", data)
        .then(res => {
            // console.log(res.data.data.token)
            localStorage.setItem("token", res.data.data.token)
            navigate("/")
        })
        .catch(error => {
            // console.log(error.response.status)
            if(error.response.status === 404){
                alert("Datos de acceso incorrectos")
            }
        })
        // console.log(data)
    }


    return (
        <div className='card-login'>
            <form onSubmit={handleSubmit(submit)}>
                  <h1>Login</h1>
                  <p>Email-adress</p>
                  <input {...register("email")} type="text" />
                  <p>We´ll never share your email with anyone else</p><br/>
                  <p>Password</p>
                  <input {...register("password")} type="password" /><br/>
                  <button>Submit</button>
            </form>

        </div>
    );
};

export default Login;