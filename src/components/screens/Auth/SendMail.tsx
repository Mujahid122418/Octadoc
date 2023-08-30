import { useState } from "react";
import "./Login.css"; // Import your CSS file if needed
import { checkEmail } from "../../../redux/Auth/AuthAPI";

import { AppDispatch } from "../../../redux/Store";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import type { RootState } from "../../../redux/Store";
import CircularProgress from '@mui/material/CircularProgress';



export default function SendMail() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); 

  const  { isLoading }  = useSelector((state: RootState) => state?.auth);
  

  const [email, setEmail] = useState("");
  
  const handleSendClick = (e : any) => {
    e.preventDefault();
    
      let data = {
        email: email,
        navigate:navigate
      };
      dispatch(checkEmail(data))
 
  };


  return (
    <div className="login-Container" style={{ height: window.innerHeight }}>
      <div className="email-wrap">
        <div className="login-html">
          <input
            id="tab-1"
            type="radio"
            name="tab"
            className="sign-in"
            defaultChecked
          />
          <label htmlFor="tab-1" className="tab">
          Recover your password.
          </label>
          <input id="tab-2" type="radio" name="tab" className="sign-up" />
          <label htmlFor="tab-2" className="tab">
          </label>
          <div className="login-form">
            <div className="sign-in-htm">
              <div className="group">
                <label htmlFor="user" className="label">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="user"
                  type="text"
                  className="input"
                  placeholder="Type your email"
                />
              </div>

              <div className="group">
               
                <button disabled={isLoading ? true: false}  className="button" onClick={(e) => handleSendClick(e)}>
                {!isLoading ?
                 <span> Send </span>
                   : <CircularProgress sx={{color:'white'}} size={16} />
                }
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
