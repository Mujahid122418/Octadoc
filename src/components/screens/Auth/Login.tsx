import { useState } from "react";
import "./Login.css"; // Import your CSS file if needed
import { LoginFun, SignupFun } from "../../../redux/Auth/AuthAPI";
import { useDispatch , useSelector } from "react-redux";
import type { RootState } from "../../../redux/Store";
import { AppDispatch } from "../../../redux/Store";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';

export default function Login() {
  const navigate = useNavigate(); // Use useNavigate hook to access
  const dispatch = useDispatch<AppDispatch>();

  const  { isLoading }  = useSelector((state: RootState) => state?.auth);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handelLogin = (e: any) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email is required");
    } else if (!password) {
      toast.error("Password is required");
    } else {
      try {
        let data = {
          email: email,
          password: password,
        };
        console.log("data", data);
        dispatch(LoginFun(data))
          .unwrap()
          .then((res) => {
            navigate("/");
          })
          .catch((error) => {});
      } catch (error) {
        console.log("errpr", error);
      }
    }
  };

  // handel signup states
  const [name, setName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [number, setNumber] = useState("");
  const handelSignup = (e: any) => {
    e.preventDefault();
    if (!signUpEmail) {
      toast.error("Email is required");
    } else if (!signupPassword) {
      toast.error("Password is required");
    } else {
      try {
        let data = {
          name: name,
          email: signUpEmail,
          password: signupPassword,
          phone: number,
        };
        console.log("register", data);

        dispatch(SignupFun(data))
          .unwrap()
          .then((res) => {
            navigate("/login");
          })
          .catch((error) => {
            console.log("register error", error);
          });
      } catch (error) {
        console.log("register error 1", error);
      }
    }
  };
  return (
    <div className="login-Container" style={{ height: window.innerHeight }}>
      <div className="login-wrap">
        <div className="login-html">
          <input
            id="tab-1"
            type="radio"
            name="tab"
            className="sign-in"
            defaultChecked
          />
          <label htmlFor="tab-1" className="tab">
            Sign In
          </label>
          <input id="tab-2" type="radio" name="tab" className="sign-up" />
          <label htmlFor="tab-2" className="tab">
            Sign Up
          </label>
          <div className="login-form">
            <div className="sign-in-htm">
              <div className="group">
                <label htmlFor="user" className="label">
                  Username or Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="user"
                  type="text"
                  className="input"
                />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">
                  Password
                </label>
                <input
                  id="pass"
                  type="password"
                  className="input"
                  data-type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="group">
                <input
                  id="check"
                  type="checkbox"
                  className="check"
                  defaultChecked
                />
                <label htmlFor="check" className=" d-flex">
                  <span className="icon"></span>{" "}
                  <p className="ms-2 text-white">Keep me Signed in</p>
                </label>
              </div>

              <div className="group">
                {/* <input type="submit" className="button" value="Sign In" /> */}

                <button disabled={isLoading ? true: false} onClick={(e) => handelLogin(e)} className="button">
                  {!isLoading ?
                 <span> Sign In </span>
                   : <CircularProgress sx={{color:'white'}} size={16} />
                }
                </button>
              </div>
              <div className="hr"></div>
              <div className="foot-lnk">
                <Link to="/SendMail" className="link">
                  <p>Forgot Password?</p>
                </Link>
              </div>
            </div>

            <div className="sign-up-htm">
              <div className="group">
                <label htmlFor="user" className="label">
                  Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  id="user"
                  type="text"
                  className="input"
                />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">
                  Email
                </label>
                <input
                  id="pass"
                  type="text"
                  className="input"
                  data-type="input"
                  onChange={(e) => setSignUpEmail(e.target.value)}
                />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">
                  Contact Number
                </label>
                <input
                  id="pass"
                  type="text"
                  className="input"
                  data-type="input"
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>

              <div className="group">
                <label htmlFor="pass" className="label">
                  Password
                </label>
                <input
                  onChange={(e) => setSignupPassword(e.target.value)}
                  id="pass"
                  type="text"
                  className="input"
                />
              </div>

              <div className="group">
                <button
                  onClick={(e) => handelSignup(e)}
                  disabled={isLoading ? true: false}
                  className="button"
                  
                >
                {!isLoading ?
                 <span> Sign In </span>
                   : <CircularProgress sx={{color:'white'}} size={16} />
                }
                </button>
              </div>
              <div className="hr"></div>
              <div className="foot-lnk">
                <label htmlFor="tab-1">Already Member?</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
