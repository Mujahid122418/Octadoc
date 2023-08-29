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
  selectTemplateModelFun,
} from "../../../redux/Template/TemplateSlice";
import SimpleBackdrop from "../../../utils/BackDrop";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Card from "./Card";
import { getcategories } from "../../../redux/Admin/CategoryAPI";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { template, isLoading } = useSelector(
    (state: RootState) => state?.template
  );

  const { user } = useSelector((state: RootState) => state?.auth);
  const { search } = useSelector((state: RootState) => state?.template);
  const { allcategory } = useSelector((state: RootState) => state?.category);
  const [filterData, setFilterData] = useState<any>([]);
  const [category, setcategory] = useState("");

  const show = 1000;

  const data = {
    pagesize: show,
  };
  useEffect(() => {
    // Variable to hold the original version of the list

    // Variable to hold the filtered list before putting into state
    let newList = [];
    // If the search bar isn't empty

    if (search !== "") {
      newList = template;

      newList = template.filter((item) => {
        const des = item?.description ? item?.description?.toLowerCase() : "";
        const name = item?.template_name
          ? item?.template_name?.toLowerCase()
          : "";

        const filter = search.toLowerCase();
        return name.includes(filter) || des.includes(filter);
      });
    } else {
      // If the search bar is empty, set newList to original task list
      newList = template;
    }

    setFilterData(newList);

    // Set the filtered state based on what our rules added to newList
  }, [search]);
  useEffect(() => {
    if (template.length > 0) {
      setFilterData(template);
    }
  }, [template]);

  useEffect(() => {
    dispatch(getcategories(data));
  }, [category]);

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
                  {allcategory.length > 0 &&
                    allcategory.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.category}
                      </option>
                    ))}
                </select>
                <ArrowDropDownIcon className="mui-select-arrow" />
              </div>
            </div>
          </div>

          {window.location.pathname === "/" ? (
            <div className="row">
              {filterData?.length > 0 ? (
                filterData.filter((item: any) =>
                  category ? item?.category_id === category : item
                ).length > 0 ? (
                  filterData
                    .filter((item: any) =>
                      category ? item?.category_id === category : item
                    )
                    ?.map((item: any, i: any) => (
                      <Card
                        item={item}
                        key={item?.category_id}
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
              {filterData?.filter((item: any) => item?.user_id === user?._id)
                ?.length > 0 ? (
                filterData.filter((item: any) =>
                  item?.isapprove === "true" && category
                    ? item?.category_id === category
                    : item
                ).length > 0 ? (
                  filterData
                    .filter((item: any) =>
                      item?.user_id === user?._id && category
                        ? item?.category_id === category
                        : item?.user_id === user?._id
                    )
                    ?.map((item: any, i: any) => (
                      <Card
                        item={item}
                        key={item?.category_id}
                        updateTemplate={updateTemplate}
                        DeleteTemplate={DeleteTemplate}
                      />
                    ))
                ) : (
                  <p style={{ textAlign: "center" }}>category No Found</p>
                )
              ) : (
                <p style={{ textAlign: "center" }}>No Record Found</p>
              )}
            </div>
          ) : (
            <div className="row">
              {filterData?.filter((item: any) => item?.isapprove === "true")
                ?.length > 0 ? (
                filterData
                  .filter((item: any) => item?.isapprove === "true")
                  .map((item: any, i: any) => (
                    <Card
                      item={item}
                      key={item?.category_id}
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
