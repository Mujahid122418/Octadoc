import { useState } from "react";
import "./Login.css"; // Import your CSS file if needed
import { LoginFun } from "../../../redux/Auth/AuthAPI";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/Store";
import { Link, useNavigate } from "react-router-dom";


export default function ForgotPass() {

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
                <label htmlFor="user" className="label">
                 New Password
                </label>
                <input
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
                  id="user"
                  type="Password"
                  className="input"
                 
                />
              </div>

              <div className="group">
                <button  className="button">
                 Send   
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
