import React, { useEffect, useState } from "react";
import "./Section.css";
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
import { Fade } from "react-reveal";

import Button2 from "../../Button2/Button2";
import {
  getSection,
  deleteSection,
} from "../../../../redux/Section/SectionAPI";

export default function Section() {
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
    dispatch(getSection(dataa));
  }, [rowsPerPage]);

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
          <Fade bottom>
            <h3 className="ms-5 heading">Sections</h3>
          </Fade>
          <Paper sx={{ width: "100%", overflow: "hidden", margin: "0 auto" }}>
            {allcategory?.length > 0 &&
              allcategory?.map((category) => (
                <Fade>
                  <span className="bandd d-flex " key={category?._id}>
                    <div className="d-flex align-items-center">
                      {category.category}

                      <div className="actionn">
                        <DeleteIcon
                          className="del"
                          onClick={() =>
                            dispatch(deleteSection(category?._id)).then(() =>
                              dispatch(getSection(dataa))
                            )
                          }
                        />
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
