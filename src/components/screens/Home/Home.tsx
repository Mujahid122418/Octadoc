import React, { useEffect } from "react";
import "./Home.css";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../redux/Store";
import { toast } from "react-toastify";
import {
  getTemplates,
  deleteEmployee,
} from "../../../redux/Template/TemplateAPI";
import { AppDispatch } from "../../../redux/Store";

import Search from "../Search/search";
import AddTemplate from "../Template/AddTemplate";
import {
  addTemplateModelFun,
  selectTemplateModelFun,
} from "../../../redux/Template/TemplateSlice";
import SimpleBackdrop from "../../../utils/BackDrop";

import Card from "./Card";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { template, isLoading } = useSelector(
    (state: RootState) => state?.template
  );
  const { user } = useSelector((state: RootState) => state?.auth);

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
  const updateTemplate = async (e: any) => {
    if (e) {
      dispatch(selectTemplateModelFun(e));
      dispatch(addTemplateModelFun(false));
    }
  };

  return (
    <div className="home">
      <div className="container">
        <SimpleBackdrop isLoading={!isLoading} />
        <Search />
        <AddTemplate />
        <div className="card-sec mt-5">
          {window.location.pathname === "/" ? (
            <div className="row">
              {template?.length > 0 ? (
                template?.map((item, i) => (
                  <Card
                    item={item}
                    key={i}
                    updateTemplate={updateTemplate}
                    DeleteTemplate={DeleteTemplate}
                  />
                ))
              ) : (
                <p style={{ textAlign: "center" }}>No Record Found</p>
              )}
            </div>
          ) : window.location.pathname === "/template" ? (
            <div className="row">
              {template.filter((item) => item?.user_id === user?._id)?.length >
              0 ? (
                template
                  .filter((item) => item?.user_id === user?._id)
                  ?.map((item, i) => (
                    <Card
                      item={item}
                      key={i}
                      updateTemplate={updateTemplate}
                      DeleteTemplate={DeleteTemplate}
                    />
                  ))
              ) : (
                <p style={{ textAlign: "center" }}>No Record Found</p>
              )}
            </div>
          ) : (
            <div className="row">
              {template.filter((item) => item?.isapprove === "true")?.length >
              0 ? (
                template
                  .filter((item) => item?.isapprove === "true")
                  .map((item, i) => (
                    <Card
                      item={item}
                      key={i}
                      updateTemplate={updateTemplate}
                      DeleteTemplate={DeleteTemplate}
                    />
                  ))
              ) : (
                <p style={{ textAlign: "center" }}>No Record Found</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
