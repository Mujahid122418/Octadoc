import React, { useEffect, useState } from "react";
import "./Category.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import TableRow from "@mui/material/TableRow";
import type { RootState } from "../../../../redux/Store";
import { AppDispatch } from "../../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Bounce } from "react-reveal";

import Button2 from "../../Button2/Button2";
import {
  addcategory,
  deleteCategory,
  getcategories,
  updatecategory,
} from "../../../../redux/Admin/CategoryAPI";

interface CategoryState {
  selectedcategory: {
    _id: string; // Make sure to use the correct data type of _id
    // ... other properties
  };
  // ... other state properties
}

export default function Category() {
  const dispatch = useDispatch<AppDispatch>();
  const { allcategory } = useSelector((state: RootState) => state?.category);

  const [category, setcategory] = useState("");
  const [selectedcategory, setselectedcategory] = useState(null);
  let data = {
    category: category,
  };

  const [rowsPerPage, setRowsPerPage] = React.useState(100);

  let dataa = {
    pagesize: rowsPerPage.toString(),
  };

  useEffect(() => {
    dispatch(getcategories(dataa));
  }, [rowsPerPage]);

  const handleClickBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(addcategory(data)).then(() => {
      dispatch(getcategories(dataa));
    });
    setcategory("");
  };

  const handleClick = (event: any) => {
    // event.preventDefault();
    console.log("edit category", event);
    setselectedcategory(event?._id);
    setcategory(event.category);
  };
  const updateCategory = () => {
    let data = {
      id: selectedcategory,
      category: category,
    };
    dispatch(updatecategory(data)).then(() => dispatch(getcategories(dataa)));
  };
  return (
    <>
      <TableContainer
        sx={{
          display: "flex",
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div className="w-75">
          <Bounce left>
            <h3 className="ms-5 heading">Categories</h3>
          </Bounce>
          <Paper sx={{ width: "100%", overflow: "hidden", margin: "0 auto" }}>
            {selectedcategory ? (
              <div className="row p-3 user-list-row">
                <div className="col-12 search-h">
                  <input
                    className="me-2"
                    type="text"
                    value={category}
                    onChange={(e) => setcategory(e.target.value)}
                    placeholder="Add category"
                  />
                  <Button2 name="Update" onClick={() => updateCategory()} />
                </div>
              </div>
            ) : (
              <div className="row p-3 user-list-row">
                <div className="col-12 search-h">
                  <input
                    className="me-2"
                    type="text"
                    value={category}
                    onChange={(e) => setcategory(e.target.value)}
                    placeholder="Add category"
                  />
                  <Button2 name="Add" onClick={handleClickBtn} />
                </div>
              </div>
            )}

            {allcategory?.length > 0 &&
              allcategory?.map((category) => (
                <Bounce>
                  <span className="bandd d-flex " key={category?._id}>
                    <div className="d-flex align-items-center">
                      {category.category}

                      <div className="actionn">
                        <EditRoundedIcon
                          className="edi"
                          onClick={() => handleClick(category)}
                        />
                      </div>
                      <div className="actionn">
                        <DeleteIcon
                          className="del"
                          onClick={() =>
                            dispatch(deleteCategory(category?._id)).then(() =>
                              dispatch(getcategories(dataa))
                            )
                          }
                        />
                      </div>
                    </div>
                  </span>
                </Bounce>
              ))}
          </Paper>
        </div>
      </TableContainer>
    </>
  );
}
