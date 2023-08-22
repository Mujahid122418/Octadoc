import React, { useEffect, useState } from "react";
import "./Setting.css";
import Avatar from "@mui/material/Avatar";
import Button2 from "../Button2/Button2";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/Store";
import type { RootState } from "../../../redux/Store";

import { updateProfile } from "../../../redux/Auth/AuthAPI";
import { toast } from "react-toastify";

const Setting = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state?.auth);

  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState(""); // Initialize with user's gender
  const [state, setState] = useState(""); // Initialize with user's state
  const [language, setLanguage] = useState(""); // Initialize with user's language
  const [countryofTraining, setcountryofTraining] = useState(
    user?.countryofTraining || ""
  ); // Initialize with user's countryofTraining
  const [workingHours, setworkingHours] = useState(user?.workingHours || ""); // Initialize with user's workingHours
  const [yearsofPractice, setyearsofPractice] = useState(
    user?.yearsofPractice || ""
  ); // Initialize with user's yearsofPractice
  console.log("gen val => ", user);

  useEffect(() => {
    setname(user?.name);
    setEmail(user?.email);
    setGender(user?.gender);
    setState(user?.state);
    setLanguage(user?.language);
    setcountryofTraining(user?.countryofTraining);
    setworkingHours(user?.workingHours);
    setyearsofPractice(user?.yearsofPractice);
  }, [user]);
  const handleClickBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!name) {
      toast.error("Name is required");
    } else if (!email) {
      toast.error("Email is required");
    } else {
      try {
        let data = {
          id: user?._id,
          name: name,
          email: user?.email,
          gender: gender,
          state: state,
          language: language,
          countryofTraining: countryofTraining,
          workingHours: workingHours,
          yearsofPractice: yearsofPractice,
          // phone: "",
        };
        dispatch(updateProfile(data));

        console.log("data ==>", data);
      } catch (error) {}
    }
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
                      value={email}
                      // onChange={(e) => setName(e.target.name)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="Text"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="name"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
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
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">Gender</option>
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
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <option value="">State</option>
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
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option value="">Language</option>
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
                      value={countryofTraining}
                      onChange={(e) => setcountryofTraining(e.target.value)}
                    >
                      <option value="">Country Of Traning</option>
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
                      value={workingHours}
                      onChange={(e) => setworkingHours(e.target.value)}
                    >
                      <option value="">Working hours</option>
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
