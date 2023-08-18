import { useState } from "react";
import "./Login.css"; // Import your CSS file if needed
import { LoginFun } from "../../../redux/Auth/AuthAPI";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/Store";
import { Link, useNavigate } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate(); // Use useNavigate hook to access
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handelLogin = () => {
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
                  <span className="icon"></span> <p className="ms-2 text-white">Keep me Signed in</p>
                </label>
              </div>

              <div className="group">
                {/* <input type="submit" className="button" value="Sign In" /> */}
                <button onClick={handelLogin} className="button">
                  Sign In
                </button>
              </div>
              <div className="hr"></div>
              <div className="foot-lnk">
              <Link to='/SendMail' className="link">
              <p>Forgot Password?</p>
              </Link>
              </div>
            </div>
            <div className="sign-up-htm">
              <div className="group">
                <label htmlFor="user" className="label">
                  Name
                </label>
                <input id="user" type="text" className="input" />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">
                  Email
                </label>
                <input
                  id="pass"
                  type="password"
                  className="input"
                  data-type="password"
                />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">
                  Contact Number
                </label>
                <input
                  id="pass"
                  type="password"
                  className="input"
                  data-type="password"
                />
              </div>

              <div className="group">
                <label htmlFor="pass" className="label">
                  Password
                </label>
                <input id="pass" type="text" className="input" />
              </div>

              <div className="group">
                <input type="submit" className="button" value="Sign Up" />
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
