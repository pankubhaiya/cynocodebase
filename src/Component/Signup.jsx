// import React from 'react';
import './Sign.css';
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../Component/Axios/Aixos";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faFacebook, faGoogle} from "@fortawesome/free-brands-svg-icons"
function SignUp() {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [Confrimpassword, setConfrimPassword] = useState("");
  const navigate = useNavigate();
  const notify = (text) =>
    toast.warn(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    const sucessnotify = (text) =>  toast.success(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });

  const register = async (e) => {
    // setSigned(true);
    e.preventDefault();
    // sessionStorage.setItem("username", username);
    // sessionStorage.setItem("Name", name);

    const response = await Axios.post("user/sign", {
      name: name,
      email:email ,
      number:number,
      password: password,
      Confrimpassword:Confrimpassword
    }).then((response) => {
      // console.log("Register response");
      console.log(response);
      // console.log(response.data, response);
      if (response.data.ok) {
        sucessnotify(response.data.msg);
      } if (!response.data.ok) {
        console.log("User already exists");
        console.log(response.data.msg)
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
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <form className="auth-form" >
        <h2>Register </h2>
        <div className="form-group">
          <label htmlFor="username">Name:</label>
          <input type="text" id="username" name="username" placeholder="Enter your name" onChange={(e) =>
            setUsername(e.target.value)
          } />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" onChange={(e) =>
            setEmail(e.target.value)
          } />
        </div>
        <div className="form-group">
          <label htmlFor="number">Number:</label>
          <input type="tel" id="number" name="number" placeholder="Enter your mobile number" maxLength={10} onChange={(e) =>
            setNumber(e.target.value)
          } />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" onChange={(e) =>
            setPassword(e.target.value)
          } />
        </div>
        <div className="form-group">
          <label htmlFor="password">Confirm Password:</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" onChange={(e) =>
            setConfrimPassword(e.target.value)
          } />
        </div>
        <div className="form-group">
          <button className='btn' type="submit" onClick={register}>Sign Up</button>
        </div>
      </form>
     
      <div className='auth' style={{ display:"flex" ,width:"90%",margin:"auto",gap:"10px"}}>
      <button
              className="btn btn-lg btn-block btn-primary"
              style={{ backgroundColor: "#fff",color:"black" }}
              type="submit"
            ><a style={{textDecoration:"none", color:"black"}} href="https://relieved-mite-dirndl.cyclic.app//user/auth/google">
              <FontAwesomeIcon style={{ backgroundColor: "#fff",color:"black",marginRight:"3px" }} icon={faGoogle}> </FontAwesomeIcon> Sign up with google
              </a></button>
            <button
              className="btn btn-lg btn-block btn-primary mb-2"
              style={{ backgroundColor: "#fff",color:"black", }}
              type="submit"
            >
              <FontAwesomeIcon style={{ backgroundColor: "#fff",color:"blue",marginRight:"5px" }} icon={faFacebook}>  </FontAwesomeIcon>
               Sign up with facebook
            </button>
      </div>
      <div className="form-group" style={{marginTop:"15px"}}>
       <span style={{color:"red"}}>Alrady have an account ?</span> <Link style={{textDecoration:"none", color:"black"}} to="/">Login </Link>
      </div>
    </div>

  );
}

export default SignUp;
