import React, { useEffect, useState } from "react";
import "./Category.css";
import Paper from "@mui/material/Paper";

import TableContainer from "@mui/material/TableContainer";

import type { RootState } from "../../../../redux/Store";
import { AppDispatch } from "../../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Fade } from "react-reveal";
import { Modal, CircularProgress } from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";

import Button2 from "../../Button2/Button2";
import {
  addcategory,
  deleteCategory,
  getcategories,
  updatecategory,
} from "../../../../redux/Admin/CategoryAPI";

import { Box } from "@mui/system";


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

  const [open, setopen] = useState(false);
  const [id, setid] = useState();



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

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "white",
    // border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const handleClose = () => {
    setopen(false);
  };

  const { isLoading: isLoadingSecton } = useSelector(
    (state: RootState) => state?.section
  );

  // ======== disable & Enabel ========

  const twofunction = (id: any) => {
    setopen(true);
    setid(id);
  };

  const actionHandler = (e: any) => {
   
  console.log(e);
  

    const editdata = {
      id: e?._id,
      enable: !e?.enable,
    };
     console.log("edit data",editdata);
    
    dispatch(updatecategory(editdata)).then(() =>
      dispatch(getcategories(dataa))
    );
  };

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }}>
          <h2 id="parent-modal-title">
            Are you sure you want to delete this Category?
          </h2>
          <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            {isLoadingSecton ? (
              <CircularProgress
                color="inherit"
                size={20}
                sx={{ mr: 2, mt: 1 }}
              />
            ) : (
              <Button2
                name="Delete"
                onClick={() =>
                  dispatch(deleteCategory(id ? id : ""))
                    .then(() => setopen(false))
                    .then(() => dispatch(getcategories(dataa)))
                }
              />
            )}
            <Button2 name="Cancel" onClick={handleClose} />
          </div>
        </Box>
      </Modal>
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
          <Fade bottom>
            <h3 className="ms-5 heading">Categories</h3>
          </Fade>
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
            <Fade bottom>
              {allcategory?.length > 0 &&
                allcategory?.map((category) => (
                  <span  className={`bandd d-flex ${category?.enable ? '' :  'lowww'}` } key={category?._id}>
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
                          onClick={() => twofunction(category?._id)}
                        />
                      </div>
                      {category?.enable ? (
                        <div className="actionn">
                          <VisibilityIcon
                            className="del"
                            onClick={() => actionHandler(category)}
                          />
                        </div>
                      ) : (
                        <div className="actionn">
                          <DoDisturbIcon
                            className="del"
                            onClick={() => actionHandler(category)}
                          />
                        </div>
                      )}
                    </div>
                  </span>
                ))}
            </Fade>
          </Paper>
        </div>
      </TableContainer>
    </>
  );
}
