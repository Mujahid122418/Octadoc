import React, { useEffect, useState } from "react";
import "./Category.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import type { RootState } from "../../../../redux/Store";
import { AppDispatch } from "../../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";

import Button2 from "../../Button2/Button2";
import {
  addcategory,
  deleteCategory,
  getcategories,
  updatecategory,
} from "../../../../redux/Admin/CategoryAPI";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: number) => string;
}
interface CategoryState {
  selectedcategory: {
    _id: string; // Make sure to use the correct data type of _id
    // ... other properties
  };
  // ... other state properties
}
const columns: readonly Column[] = [
  { id: "category", label: "category", minWidth: 200 },
  { id: "Edit/Delete", label: "Action", minWidth: 170 },
];

export default function Category() {
  const dispatch = useDispatch<AppDispatch>();
  const { allcategory } = useSelector((state: RootState) => state?.category);

  const [category, setcategory] = useState("");
  const [selectedcategory, setselectedcategory] = useState(null);
  let data = {
    category: category,
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);

  let dataa = {
    pagesize: rowsPerPage.toString(),
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
        <div className="">
          <h3 className="ms-5 heading">Categories</h3>
          <Paper sx={{ width: "100%", overflow: "hidden", margin: "0 auto" }}>
            {selectedcategory ? (
              <div className="row p-3 user-list-row">
                <div className="col-12 search-h">
                  <input
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
                    type="text"
                    value={category}
                    onChange={(e) => setcategory(e.target.value)}
                    placeholder="Add category"
                  />
                  <Button2 name="Add" onClick={handleClickBtn} />
                </div>
              </div>
            )}
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead className="table-head">
                  <TableRow sx={{ background: "transparent" }}>
                    {columns.length > 0 &&
                      columns.map((column) => (
                        <TableCell
                          sx={{ background: "transparent", color: "white" }}
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allcategory.length > 0 &&
                    allcategory.map((category) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={category?._id}
                      >
                        <TableCell align="left">{category.category}</TableCell>
                        <TableCell align="left" className="d-flex">
                          <Button2
                            onClick={() => handleClick(category)}
                            name="Edit"
                          />
                          <button
                            className="btn btn-danger p-1"
                            onClick={() =>
                              dispatch(deleteCategory(category?._id)).then(() =>
                                dispatch(getcategories(dataa))
                              )
                            }
                          >
                            <DeleteIcon />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              className="table-fot"
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={allcategory.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </TableContainer>
    </>
  );
}
