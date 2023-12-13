// import React from 'react';
import './Sign.css';
import React, { useState, useEffect } from "react";
import { Link, useNavigate ,Navigate} from "react-router-dom";
import Axios from "../Component/Axios/Aixos";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faFacebook, faGoogle} from "@fortawesome/free-brands-svg-icons"
function Signin() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const notify = (text) =>
    toast.error(text, {

    });
  const sucessnotify = (text) => toast.success(text, {

  });

  const register = async (e) => {
    
    e.preventDefault();
    

    const response = await Axios.post("user/login", {

      email: email,
      password: password,
    }).then((response) => {
      // console.log("Register response");
      console.log(response);
      // console.log(response.data, response);
      if (response.data.ok) {
        // console.log("Register success");
        // setSigned(true);
        localStorage.setItem('token', response.data.token);
        sucessnotify(response.data.msg);
        navigate("/home");
      } if (!response.data.ok) {
        console.log("User already exists");
        console.log(response.data.mes)
        notify(response.data.msg);


      }
      else {
        console.log("Signup failed");
        // console.log(response.data.Message);
      }
    });
  };

  return (


    <div className="auth-container">
      <ToastContainer

      />
      <form className="auth-form" >
        <h2>Login</h2>



        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" onChange={(e) =>
            setEmail(e.target.value)
          } />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" onChange={(e) =>
            setPassword(e.target.value)
          } />
        </div>
        <div className="form-group">
          <button className='btn' type="submit" onClick={register}>Sign in</button>
        </div>
      </form>
      <div className='auth' style={{ display:"flex" ,width:"90%",margin:"auto",gap:"10px"}}>
      <button
              className="btn btn-lg btn-block btn-primary"
              style={{ backgroundColor: "#fff",color:"black" }}
              type="submit"
            ><a style={{textDecoration:"none", color:"black"}} href="https://blushing-hospital-gown-foal.cyclic.app//user/auth/google">
            <FontAwesomeIcon style={{ backgroundColor: "#fff",color:"black",marginRight:"3px" }} icon={faGoogle}> </FontAwesomeIcon> Sign in with google
            </a>
            </button>
            <button
              className="btn btn-lg btn-block btn-primary mb-2"
              style={{ backgroundColor: "#fff",color:"black", }}
              type="submit"
            >
              <FontAwesomeIcon style={{ backgroundColor: "#fff",color:"blue",marginRight:"5px" }} icon={faFacebook}>  </FontAwesomeIcon>
               Sign in with facebook
            </button>
      </div>
      <div className="form-group" style={{marginTop:"15px", display:"flex",justifyContent:"space-around"}}>
       <div><span style={{color:"black"}}>Create Account ?</span> <Link style={{textDecoration:"none", color:"blue"}} to="/signup">Register</Link></div> 
       <div>Forgot Password</div>
      </div>
     
    </div>

  );
}

export default Signin;
