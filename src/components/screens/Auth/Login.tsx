import "./Login.css"; // Import your CSS file if needed
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import backgroundImage from "../../../assets/left_image.png";
import logo from "../../../assets/gp_notes.png";
import Button from "../Button/Button";

export default function Login() {
  const backgroundImageStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: window.innerHeight,
  };
  // commment
  return (
    // <Box sx={{ flexGrow: 1 }}>
    //   <Grid container>
    //     <Grid item xs={12} md={6}>
    //       <div style={backgroundImageStyle}></div>
    //     </Grid>
    //     <Grid item xs={12} md={6}>
    <div className="login-Container" style={{ height: window.innerHeight }}>
      <div className="login-wrap">
        <div
          style={{
            //   backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            //   paddingTop: "5%",
          }}
        >
          <img alt="logo" src={logo} />
        </div>
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
                <input id="user" type="text" className="input" />
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
                />
              </div>
              <div className="group">
                <input
                  id="check"
                  type="checkbox"
                  className="check"
                  defaultChecked
                />
                <label htmlFor="check">
                  <span className="icon"></span> Keep me Signed in
                </label>
              </div>
              {/* <div
                      className="group"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Button />
                    </div> */}

              <div className="group">
                <input type="submit" className="button" value="Sign In" />
              </div>
              <div className="hr"></div>
              <div className="foot-lnk">
                <a href="#forgot">Forgot Password?</a>
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
    //   </Grid>
    // </Grid>
    // </Box>
  );
}
