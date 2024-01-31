import React, { useEffect, useState, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Button2 from "../Button2/Button2";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/Store";
import type { RootState } from "../../../redux/Store";

import { updateProfile } from "../../../redux/Auth/AuthAPI";
import { toast } from "react-toastify";
import { Fade } from "react-reveal";
import { countries } from "./country";
import Tagify from "@yaireo/tagify";
import { getinterest } from "../../../redux/interest/InterestAPI";
import Multiselect from 'multiselect-react-dropdown';
const Profilee = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state?.auth);
  const { interest: GetInterestData } = useSelector(
    (state: RootState) => state?.interest
  );
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
  );
  const [interest, setInterest] = useState<any>([]);
  const [selectedValues, setSelectedValues] = useState<any>([]);
  // Initialize with user's yearsofPractice



  useEffect(() => {
    console.log("user", user?.interest);

    setname(user?.name);
    setEmail(user?.email);
    setGender(user?.gender);
    setState(user?.state);
    setLanguage(user?.language);
    setcountryofTraining(user?.countryofTraining);
    setworkingHours(user?.workingHours);
    setyearsofPractice(user?.yearsofPractice);
    setInterest(user?.interest);

  }, [user, GetInterestData]);
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
          interest: interest
        };


        dispatch(updateProfile(data));
      } catch (error) { }
    }
  };
  // handel tagify
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      // Initialize Tagify when the component mounts
      const tagify = new Tagify(inputRef.current, {
        enforceWhitelist: true,
        whitelist: ["tag1", "tag2", "tag3"],
        dropdown: {
          maxItems: 5,
        },
      });

      // Optionally, handle events or modify the tags dynamically
      tagify.on("add", (e: any) => console.log("Tag added:", e.detail));
      tagify.on("remove", (e: any) => console.log("Tag removed:", e.detail));

      // Cleanup Tagify when the component unmounts
      return () => {
        tagify.destroy();
      };
    }
  }, []);
  // get interest
  const [rowsPerPage, setRowsPerPage] = React.useState(100);

  let dataa = {
    page: 1,
    pagesize: rowsPerPage.toString(),
  };

  useEffect(() => {
    dispatch(getinterest(dataa));
  }, [rowsPerPage]);
  // get interest end
  // interest start
  // one filter interest
  useEffect(() => {
    let interest: string[] = [];
    selectedValues?.forEach((item: any) => {
      if (item?.name) {
        interest.push(item?._id);
      }
    });
    console.log("see interest", interest);

    setInterest(interest)

  }, [selectedValues]);
  // one filter interest end
  useEffect(() => {

    console.log("selectedValues", selectedValues);

    console.log("GetInterestData", GetInterestData);
    console.log("interest", interest);

    if (GetInterestData?.length > 0 && user?.interest?.length > 0) {
      const filteredData = GetInterestData?.filter((item) => user?.interest?.includes(item?._id));

      setSelectedValues(filteredData)
    }

  }, [GetInterestData, user]) // user, interest,

  const onSelect = (selectedList: any, selectedItem: any) => {
    setSelectedValues(selectedList);
  };

  const onRemove = (selectedList: any, removedItem: any) => {
    setSelectedValues(selectedList);
  };

  // interest end

  return (
    <div>
      <div className="container mb-5">
        <div className="form-box">
          <Fade bottom>
            <h4>Profile Photo</h4>
          </Fade>

          <Fade bottom>
            <div className="profile-box">
              <Avatar className="avatar">p</Avatar>
              <button className="btn btn-update ms-4">Update Photo</button>
            </div>
          </Fade>

          <Fade bottom>
            <h4 className="mt-4">Profile Information</h4>
          </Fade>

          <Fade bottom>
            <div className="contact-box">
              <div className="row   d-flex justify-content-center">
                <div className="col-lg-6 col-md-8 col-10">
                  <form className="bg-white w-100">
                    <div className="form-group">
                      <input
                        ref={inputRef}
                        placeholder="Type and press Enter"
                      />
                      <label style={{ marginLeft: "0px" }} htmlFor="user">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ marginTop: "0px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ marginLeft: "0px" }} htmlFor="user">
                        Name
                      </label>
                      <input
                        type="Text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="name"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        style={{ marginTop: "0px" }}
                      />
                    </div>
                    <div className="position-relative">
                      <label style={{ marginLeft: "0px" }} htmlFor="user">
                        Interest
                      </label>
                      <Multiselect
                        options={GetInterestData}
                        displayValue="name"
                        onSelect={onSelect}
                        onRemove={onRemove}
                        selectedValues={selectedValues}
                      />
                    </div>
                    {/* <div className="position-relative">
                      <label style={{ marginLeft: "0px" }} htmlFor="user">
                        Interest
                      </label>
                      <select
                        className="form-control select-arrow"
                        id="customSelect"
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        style={{ marginTop: "0px" }}
                      >
                        <option value="">Select Interest</option>
                        {GetInterestData.map((e, index) => (
                          <option key={index}>{e.name}</option>
                        ))}
                      </select>
                      <ArrowDropDownIcon className="mui-select-arrow" />
                    </div> */}
                    <div className="position-relative">
                      <label style={{ marginLeft: "0px" }} htmlFor="user">
                        Gender
                      </label>
                      <select
                        className="form-control select-arrow"
                        id="customSelect"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        style={{ marginTop: "0px" }}
                      >
                        <option value="">Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Non Binary</option>
                      </select>
                      <ArrowDropDownIcon className="mui-select-arrow" />
                    </div>

                    <div className="position-relative">
                      <label style={{ marginLeft: "0px" }} htmlFor="user">
                        State
                      </label>
                      <select
                        className="form-control select-arrow"
                        id="customSelect"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        style={{ marginTop: "0px" }}
                      >
                        <option value="">State</option>
                        {countries.map((country, index) => (
                          <option key={index}>{country.name}</option>
                        ))}
                      </select>
                      <ArrowDropDownIcon className="mui-select-arrow" />
                    </div>

                    <div className="position-relative">
                      <label style={{ marginLeft: "0px" }} htmlFor="user">
                        Language
                      </label>
                      <select
                        className="form-control select-arrow"
                        id="customSelect"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        style={{ marginTop: "0px" }}
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
                      <label style={{ marginLeft: "0px" }} htmlFor="user">
                        Country Of Traning
                      </label>
                      <select
                        className="form-control select-arrow"
                        id="customSelect"
                        value={countryofTraining}
                        onChange={(e) => setcountryofTraining(e.target.value)}
                        style={{ marginTop: "0px" }}
                      >
                        <option value="">Country Of Traning</option>
                        {countries.map((country, index) => (
                          <option key={index}>{country.name}</option>
                        ))}
                      </select>
                      <ArrowDropDownIcon className="mui-select-arrow" />
                    </div>

                    <div className="position-relative">
                      Working hours
                      <select
                        className="form-control select-arrow"
                        id="customSelect"
                        value={workingHours}
                        onChange={(e) => setworkingHours(e.target.value)}
                        style={{ marginTop: "0px" }}
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
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default Profilee;
