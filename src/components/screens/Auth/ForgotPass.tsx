import { useState } from "react";
import "./Login.css"; // Import your CSS file if needed
import {  updatePassword } from "../../../redux/Auth/AuthAPI";

import { AppDispatch } from "../../../redux/Store";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch , useSelector } from "react-redux";
import type { RootState } from "../../../redux/Store";
import CircularProgress from '@mui/material/CircularProgress';


export default function ForgotPass() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const  { isLoading }  = useSelector((state: RootState) => state?.auth); 
  console.log("isloading" , isLoading);
  
  const [pass , setpass] = useState('');
  const[confirm , setconfirm] = useState('');
  let user_id = localStorage.getItem("user-id");
  const enterData = (e:any) => {
    e.preventDefault();
    if(pass === confirm || confirm === pass) {
    
        let data = {
          id : user_id,
          currentPassword : pass ,
          newPassword : pass , 
        };
        console.log('data', data);
        
        dispatch(updatePassword(data))
         
    }else{
      toast.error("Your New password and confirm password did't match");
    }

  }



 

  return (
    <div className="login-Container" style={{ height: window.innerHeight }}>
      <div className="forgot-wrap">
        <div className="login-html">
          <input
            id="tab-1"
            type="radio"
            name="tab"
            className="sign-in"
            defaultChecked
          />
          <label htmlFor="tab-1" className="tab">
           Email
          </label>
          <input id="tab-2" type="radio" name="tab" className="sign-up" />
          <label htmlFor="tab-2" className="tab">
          </label>
          <div className="login-form">
            <div className="sign-in-htm">
              <div className="group">
               <div className="d-flex align-items-center">
               <label style={{flex:2}} htmlFor="user" className="label">
                 New Password
                </label>
                <p className="mb-1 d-flex w-100" style={{fontSize : 11, color: 'white' , flex : 4 }}>password must be at least 8 characters</p>
               </div>
                <input
                  value={pass}
                  onChange={(e) => setpass(e.target.value)}
                  id="user"
                  type="Password"
                  className="input"
                />
               
              </div>

              <div className="group">
                <label htmlFor="user" className="label">
                 Confirm Password
                </label>
                <input
                  value={confirm}
                  onChange={(e) => setconfirm(e.target.value)}
                  id="user"
                  type="Password"
                  className="input"
                 
                />
              </div>

              <div className="group">
                <button  disabled={isLoading ? true: false} className="button" onClick={(e) => enterData(e)}>
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
