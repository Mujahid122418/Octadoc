import React, { useState } from "react";
import "./Setting.css";
import Avatar from "@mui/material/Avatar";
import Button2 from "../Button2/Button2";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/Store";
const Setting = () => {
  const { user } = useSelector((state: RootState) => state?.auth);

  // const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [state, setState] = useState("");
  const [language, setLanguage] = useState("");
  const [countryofTraining, setcountryofTraining] = useState("");
  const [workingHours, setworkingHours] = useState("");
  const [yearsofPractice, setyearsofPractice] = useState("");

  const handleClickBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      let data = {
        id: user?._id,
        gender: gender,
        state: state,
        language: language,
        countryofTraining: countryofTraining,
        workingHours: workingHours,
        yearsofPractice: yearsofPractice,
        // phone: "",
        password: password,
      };
      console.log("data ==>", data);
    } catch (error) {}
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

                  <div className="position-relative">
                    <select
                      className="form-control select-arrow"
                      id="customSelect"
                      onChange={(e) => setGender(e.target.value)}
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
                      onChange={(e) => setState(e.target.value)}
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
                      onChange={(e) => setLanguage(e.target.value)}
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
                      onChange={(e) => setcountryofTraining(e.target.value)}
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
                      onChange={(e) => setworkingHours(e.target.value)}
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
