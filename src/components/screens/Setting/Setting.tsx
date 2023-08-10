import React, { useState } from "react";
import "./Setting.css";
import Avatar from "@mui/material/Avatar";
import Button2 from "../Button2/Button2";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/Store";
const Setting = () => {
  const { user } = useSelector((state: RootState) => state?.auth);

  const [name, setName] = useState("");

  const handleClickBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <div>
      <div className="container mb-5">
        <div className="form-box">
          <h4>Profile Photo</h4>
          <div className="profile-box">
            <Avatar className="avatar">p</Avatar>
            <button className="btn btn-update ms-4">Update Photo</button>
          </div>

          <h4 className="mt-4">Contact Information</h4>
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
                      value={user?.email}
                      onChange={(e) => setName(e.target.name)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                    />
                  </div>

                  <div className="position-relative">
                    <select
                      className="form-control select-arrow"
                      id="customSelect"
                    >
                      <option value="" disabled>
                        Gender
                      </option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Non Binary</option>
                    </select>
                    <ArrowDropDownIcon className="mui-select-arrow" />
                  </div>

                  <div className="position-relative">
                    <select
                      className="form-control select-arrow"
                      id="customSelect"
                    >
                      <option value="" disabled>
                        State
                      </option>
                      <option>Pakistan</option>
                      <option>India</option>
                      <option>Dubai</option>
                      <option>Oman</option>
                      <option>United Kindom</option>
                    </select>
                    <ArrowDropDownIcon className="mui-select-arrow" />
                  </div>

                  <div className="position-relative">
                    <select
                      className="form-control select-arrow"
                      id="customSelect"
                    >
                      <option value="" disabled>
                        First Language
                      </option>
                      <option>Urdu</option>
                      <option>English</option>
                      <option>Arbi</option>
                      <option>Hindi</option>
                      <option>Franch</option>
                    </select>
                    <ArrowDropDownIcon className="mui-select-arrow" />
                  </div>

                  <div className="position-relative">
                    <select
                      className="form-control select-arrow"
                      id="customSelect"
                    >
                      <option value="" disabled>
                        Country Of Traning
                      </option>
                      <option>Dubai</option>
                      <option>Pakistan</option>
                      <option>India</option>
                      <option>Oman</option>
                      <option>United Kindom</option>
                    </select>
                    <ArrowDropDownIcon className="mui-select-arrow" />
                  </div>

                  <div className="position-relative">
                    <select
                      className="form-control select-arrow"
                      id="customSelect"
                    >
                      <option value="" disabled>
                        Working hours
                      </option>
                      <option>Part Time</option>
                      <option>Full Time</option>
                    </select>
                    <ArrowDropDownIcon className="mui-select-arrow" />
                  </div>

                  <Button2 name="Update" onClick={handleClickBtn} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
