import React, { useEffect, useState } from "react";
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
  searchDataFun,
  selectTemplateModelFun,
} from "../../../redux/Template/TemplateSlice";
import SimpleBackdrop from "../../../utils/BackDrop";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Card from "./Card";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { template, isLoading } = useSelector(
    (state: RootState) => state?.template
  );
  const { user } = useSelector((state: RootState) => state?.auth);
  const { search } = useSelector((state: RootState) => state?.template);

  const [category, setcategory] = useState("");

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
          <div className="row d-flex  justify-content-end ">
            <div className="col-md-6 col-lg-4">
              <div className="position-relative">
                <select
                  className="form-control select-arrow"
                  id="customSelect"
                  value={category}
                  onChange={(e) => setcategory(e.target.value)}
                >
                  <option value="">Select</option>
                  <option>Addiction Medicine</option>
                  <option>Anaesthesia</option>
                  <option>Antenatal</option>
                  <option>Bariatric Medicine</option>
                  <option>Cardiology</option>
                  <option>Children’s Health</option>
                  <option>Chronic Disease Management</option>
                  <option>Dermatology</option>
                  <option>Drugs & Alcohol</option>
                  <option>Emergency</option>
                  <option>Endocrinology</option>
                  <option>ENT</option>
                  <option>Fertility</option>
                  <option>Gastroenterology</option>
                  <option>General Surgery</option>
                  <option>Genetics</option>
                  <option>Geriatric Medicine</option>
                  <option>Haematology</option>
                  <option>Immunisations</option>
                  <option>Immunology</option>
                  <option>Infectious Diseases</option>
                  <option>Maxillo Facial</option>
                  <option>Men’s Health</option>
                  <option>Mental Health</option>
                  <option>Nephrology</option>
                  <option>Neurology</option>
                  <option>Occupational Medicine</option>
                  <option>Oncology</option>
                  <option>Ophthalmology</option>
                  <option>Ortho/MSK</option>
                  <option>Pain Medicine</option>
                  <option>Palliative Care</option>
                  <option>Pathology</option>
                  <option>Preventative Medicine</option>
                  <option>Procedures</option>
                  <option>Respiratory</option>
                  <option>Rheumatology</option>
                  <option>Sexual health</option>
                  <option>Vascular Surgery</option>
                  <option>Women's Health</option>
                  <option>Other</option>
                </select>
                <ArrowDropDownIcon className="mui-select-arrow" />
              </div>
            </div>
          </div>

          {window.location.pathname === "/" ? (
            <div className="row">
              {template?.length > 0 ? (
                template.filter((item) =>
                  category ? item?.category_id === category : item
                ).length > 0 ?
                
                (
                  template
                    .filter((item) =>
                      category ? item?.category_id === category : item
                    )
                    ?.map((item, i) => (
                      <Card
                        item={item}
                        key={i}
                        updateTemplate={updateTemplate}
                        DeleteTemplate={DeleteTemplate}
                      />
                    ))
                ) : (
                  <p style={{ textAlign: "center" }}>Category No Found</p>
                )
              ) : (
                <p style={{ textAlign: "center" }}>No Record Found</p>
              )}
            </div>
          ) : window.location.pathname === "/template" ? (
            <div className="row">
              {template?.filter((item) => item?.user_id === user?._id)?.length >
              0 ? (
                template.filter((item) =>

                search.toLowerCase() === "" ? item : item?.category_id.toLowerCase().includes(search.toLowerCase())
                  
                ).length > 0 ? (
                  template.filter((item) =>
                    item?.isapprove === "true" && category
                      ? item?.category_id === category
                      : item
                  ).length > 0 ? (
                    template
                      .filter((item) =>
                        item?.user_id === user?._id && category
                          ? item?.category_id === category
                          : item?.user_id === user?._id
                      )
                      ?.map((item, i) => (
                        <Card
                          item={item}
                          key={i}
                          updateTemplate={updateTemplate}
                          DeleteTemplate={DeleteTemplate}
                        />
                      ))
                  ) : (
                    <p style={{ textAlign: "center" }}>category No Found</p>
                  )
                ) : (
                  <p style={{ textAlign: "center" }}>
                    Search category No Found
                  </p>
                )
              ) : (
                <p style={{ textAlign: "center" }}>No Record Found</p>
              )}
            </div>
          ) : (
            <div className="row">
              {template?.filter((item) => item?.isapprove === "true")?.length >
              0 ? (
                template.filter((item) =>
                search.toLowerCase() === "" ? item : item?.category_id.toLowerCase().includes(search.toLowerCase())
                ).length > 0 ? (
                  template.filter((item) =>
                    item?.isapprove === "true" && category
                      ? item?.category_id === category
                      : item
                  ).length > 0 ? (
                    template
                      .filter((item) =>
                        item?.isapprove === "true" && category
                          ? item?.category_id === category
                          : item
                      )
                      .map((item, i) => (
                        <Card
                          item={item}
                          key={i}
                          updateTemplate={updateTemplate}
                          DeleteTemplate={DeleteTemplate}
                        />
                      ))
                  ) : (
                    <p style={{ textAlign: "center" }}>category no Found</p>
                  )
                ) : (
                  <p style={{ textAlign: "center" }}>
                    Search category No Found
                  </p>
                )
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
