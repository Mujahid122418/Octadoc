import { useState } from "react";
import "./Login.css"; // Import your CSS file if needed
import { sendOtp } from "../../../redux/Auth/AuthAPI";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/Store";
import { useNavigate } from "react-router-dom";


export default function OTP() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); 

  const [otp, setotp] = useState("");


    let user_id = localStorage.getItem("user-id");

  
  const handleSendClick = (e : any) => {
    e.preventDefault();
    
      let data = {
        otp: otp,
        _id : user_id,
        navigate:navigate
      };
      dispatch(sendOtp(data))
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
         Your OPT Is On Your Gmail
          </label>
          <input id="tab-2" type="radio" name="tab" className="sign-up" />
          <label htmlFor="tab-2" className="tab">
          </label>
          <div className="login-form">
            <div className="sign-in-htm">
              <div className="group">
                <label htmlFor="user" className="label">
                 OTP
                </label>
                <input
                  value={otp}
                  onChange={(e) => setotp(e.target.value)}
                  id="user"
                  type="text"
                  className="input"
                  placeholder="_ _ _ _"
                />
              </div>

              <div className="group">
               
                <button  className="button" onClick={(e) => handleSendClick(e)}>
                 {/* <Link to='/forgot' className="link"> */}
                 Send
                 {/* </Link> */}
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
