import React, { useEffect } from "react";
import "./Admin.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import type { RootState } from "../../../redux/Store";
import { AppDispatch } from "../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, updaterole } from "../../../redux/Auth/AuthAPI";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { handelUpdateUser } from "../../../redux/Auth/AuthSlice";




interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "_id", label: "ID", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "action", label: "action", minWidth: 100 },
  { id: "status", label: "status", minWidth: 100 },
];

export default function Admin() {
  const dispatch = useDispatch<AppDispatch>();
  const { allUsers , user } = useSelector((state: RootState) => state?.auth);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


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
    dispatch(getAllUsers());
  }, []);



    
    const handleRoleChange = (userId: string, newRole: string) => {

      const data = {
       id : userId ,
       role : newRole ,
     }

       dispatch(updaterole(data)).then(() => {
        dispatch(getAllUsers());
       });
    
   } 
  

   const handleStatusChange = (userId: string, newstatus: string) => {

    const data = {
     id : userId ,
     status : newstatus ,
   }

     dispatch(updaterole(data)).then(() => {
      dispatch(getAllUsers());
     });
  
 } 
  

  return (
    <Paper sx={{ width: "95%", overflow: "hidden", margin: "0 auto" }}>
     <div className="row p-3 user-list-row">
      <div className="col-6 d-flex align-items-center">
        <h3 className="mb-0">Users List</h3>
      </div>
      <div className="col-6 search-h">
        <input type="text" placeholder="Serach Here..." />
      </div>
     </div>
      <TableContainer sx={{ maxHeight: 440,}} >
        <Table stickyHeader aria-label="sticky table">
          <TableHead className="table-head" >
            <TableRow sx={{background:'transparent'}} >
              {columns.map((column) => (
                <TableCell
                sx={{background:'transparent',color:'white'}}
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
            {allUsers.map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                <TableCell align="left">{row._id}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">
                <div className="position-relative">
                    <select
                      className="form-control select-arrow"
                      id="customSelect"
                      value={row.role}
                      onChange={(e) => handleRoleChange(row._id, e.target.value)
                      
                      }
                    >
                      <option value="">Select</option>
                      <option>admin</option>
                      <option>superadmin</option>
                      <option>user</option>
              
                    </select>
                    <ArrowDropDownIcon className="mui-select-arrow" />
              </div>
                  </TableCell>
                <TableCell align="left">
                <div className="position-relative">
                    <select
                      className="form-control select-arrow"
                      id="customSelect"
                      value={row?.status}
                      onChange={(e) => handleStatusChange(row._id, e.target.value)}
                    >
                      <option value="">Select</option>
                      <option >active</option>
                      <option >inactive</option>
              
                    </select>
                    <ArrowDropDownIcon className="mui-select-arrow" />
              </div>
                  
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
  count={allUsers.length}
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={handleChangePage}
  onRowsPerPageChange={handleChangeRowsPerPage}
/>
    </Paper>
  );
}
