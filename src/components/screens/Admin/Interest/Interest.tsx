import React, { useEffect, useState } from "react";
import "./Interest.css";
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
  addinterest,
  deleteinterest,
  getinterest,
  updateinterest,
} from "../../../../redux/interest/InterestAPI";

import { Box } from "@mui/system";

export default function Interest() {
  const dispatch = useDispatch<AppDispatch>();
  const { interest: GetInterestData } = useSelector(
    (state: RootState) => state?.interest
  );
  const { user } = useSelector((state: RootState) => state?.auth);

  const [open, setopen] = useState(false);
  const [id, setid] = useState();

  const [interest, setinterest] = useState("");
  const [selectedinterest, setselectedinterest] = useState(null);

  const [rowsPerPage, setRowsPerPage] = React.useState(100);

  let dataa = {
    page: 1,
    pagesize: rowsPerPage.toString(),
  };

  useEffect(() => {
    dispatch(getinterest(dataa));
  }, [rowsPerPage]);

  const handleClickBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let data = {
      user_id: user?._id,
      name: interest,
    };

    dispatch(addinterest(data)).then(() => {
      dispatch(getinterest(dataa));
    });
    setinterest("");
  };

  const handleClickEdit = (event: any) => {
    setselectedinterest(event?._id);
    setinterest(event.name);
  };
  const updateinterestBtn = () => {
    let data = {
      id: selectedinterest,
      name: interest,
    };

    dispatch(updateinterest(data)).then((res) => {
      dispatch(getinterest(dataa));
      setselectedinterest(null);
    });
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
    (state: RootState) => state?.interest
  );

  // ======== disable & Enabel ========

  const DeleteInterest = (id: any) => {
    setopen(true);
    setid(id);
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
            Are you sure you want to delete this interest?
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
                  dispatch(deleteinterest(id ? id : ""))
                    .then(() => setopen(false))
                    .then(() => dispatch(getinterest(dataa)))
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
            <h3 className="ms-5 heading">Interest</h3>
          </Fade>
          <Paper sx={{ width: "100%", overflow: "hidden", margin: "0 auto" }}>
            {selectedinterest ? (
              <div className="row p-3 user-list-row">
                <div className="col-12 search-h">
                  <input
                    className="me-2"
                    type="text"
                    value={interest}
                    onChange={(e) => setinterest(e.target.value)}
                    placeholder="Add Interest"
                  />
                  <Button2 name="Update" onClick={() => updateinterestBtn()} />
                </div>
              </div>
            ) : (
              <div className="row p-3 user-list-row">
                <div className="col-12 search-h">
                  <input
                    className="me-2"
                    type="text"
                    value={interest}
                    onChange={(e) => setinterest(e.target.value)}
                    placeholder="Add Interest"
                  />
                  <Button2 name="Add" onClick={handleClickBtn} />
                </div>
              </div>
            )}

            {GetInterestData?.length > 0 &&
              GetInterestData?.map((item: any, i: any) => (
                <Fade bottom>
                  <span
                    className={`bandd d-flex  "lowww"
                    `}
                  >
                    <div className="d-flex align-items-center">
                      {item?.name}
                      <div className="d-flex align-items-center">
                        <div className="actionn">
                          <EditRoundedIcon
                            className="edi"
                            onClick={() => handleClickEdit(item)}
                          />
                        </div>
                        <div className="actionn">
                          <DeleteIcon
                            className="del"
                            onClick={() => DeleteInterest(item?._id)}
                          />
                        </div>
                      </div>
                    </div>
                  </span>
                </Fade>
              ))}
          </Paper>
        </div>
      </TableContainer>
    </>
  );
}
