import React, { useEffect, useState } from "react";
import "./Setting.css";
import Button2 from "../Button2/Button2";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/Store";
import type { RootState } from "../../../redux/Store";

import { updatePassword } from "../../../redux/Auth/AuthAPI";
import { toast } from "react-toastify";
import { Fade } from 'react-reveal';



const Setting = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state?.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  console.log("gen val => ", user);

  useEffect(() => {
    setEmail(user?.email);
  }, [user]);
  const handleClickBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  
      try {
        let data = {
          user_id: user?._id,
          password: password
        };
        dispatch(updatePassword(data)).then(() => {
          setPassword('');
        });
        console.log("data ==>", data);
      } catch (error) {}
    
  };

  return (
    <div>
      <div className="container mb-5">
        <div className="form-box">

          <Fade bottom>
          <h4 className="mt-4">Change Password</h4>
          </Fade>

          <Fade bottom>
          <div className="contact-box">
            <div className="row   d-flex justify-content-center">
              <div className="col-lg-6 col-md-8 col-10">
                <form className="bg-white w-100">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      disabled
                      value={email}
                      // onChange={(e) => setName(e.target.name)}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <Button2 name="Update" onClick={handleClickBtn} />
                </form>
              </div>
            </div>
          </div>
          </Fade>
          
        </div>
      </div>
    </div>
  );
};

export default Setting;
