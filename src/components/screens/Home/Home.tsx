import React, { useEffect } from "react";
import "./Home.css";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../redux/Store";
import { toast } from "react-toastify";
import {
  getTemplates,
  deleteEmployee,
} from "../../../redux/Template/TemplateAPI";
import { AppDispatch } from "../../../redux/Store";
const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const template = useSelector((state: RootState) => state?.template?.template);

  useEffect(() => {
    dispatch(getTemplates());
  }, [dispatch]);
  const DeleteTemplate = async (e: any) => {
    if (e) {
      dispatch(deleteEmployee(e))
        .unwrap()
        .then((response) => {
          toast.success("Delete successfully");
          dispatch(getTemplates());
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  return (
    <div className="home">
      <div className="container">
        <div className="search-box">
          <div className="rowc search-row w-100">
            <div className="col-lg-6 col-md-6 col-10">
              <div className="search-bar">
                <SearchIcon />
                <input type="text" placeholder="Search all Octados templates" />
              </div>
            </div>
          </div>
        </div>

        <div className="card-sec mt-5">
          <div className="row">
            {template?.length > 0 ? (
              template?.map((item, i) => (
                <div className="col-lg-4 col-md-6 mt-4" key={i}>
                  {/* <button onClick={() => DeleteTemplate(item?._id)}>
                    delete
                  </button> */}
                  <div className="card-box">
                    <div className="card-head">
                      <div className="icon-box">
                        <IconButton>
                          <ViewStreamIcon />
                        </IconButton>
                        <div className="band">
                          <p>12</p>
                        </div>
                      </div>
                      <div className="text">
                        <center>
                          <h6>{item?.template_name}</h6>
                          <p>
                            By <b>{item?.template_type}</b>
                          </p>
                        </center>
                      </div>
                      <div className="icon-box">
                        <IconButton>
                          <QuestionMarkIcon />
                        </IconButton>
                        <div className="band">
                          <p>2</p>
                        </div>
                      </div>
                    </div>

                    <center>
                      <p className="btm-text">{item?.description}</p>
                    </center>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center" }}>No Record Found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
