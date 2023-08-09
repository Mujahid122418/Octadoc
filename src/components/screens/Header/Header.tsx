import React from "react";
import "./Header.css";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import IconButton from "@mui/material/IconButton";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import Button2 from "../Button2/Button2";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

  };
  return (
    <div className="header">
      <div className=" d-flex align-items-center justify-content-end">
        <IconButton>
          <HelpOutlineIcon />
        </IconButton>
        <div data-bs-toggle="modal" data-bs-target="#exampleModal">
          <Button2 name="New Templates" onClick={handleClickBtn}/>
        </div>
        {/* ========modal box========== */}
        <div
          className="modal fade"
          id="exampleModal"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                 New Template
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {/* ===== form ==== */}
                <form className="bg-white w-100">
                  <div className="form-group">
                    <label className="lab" htmlFor="">Title*</label>
                    <input
                      type="text"
                      className="form-control mt-2"
                      aria-describedby="emailHelp"
                      placeholder="What is this template for?"
                    />
                  </div>

                  <div className="form-group">
                  <label className="lab" htmlFor="">Description*</label>
                  <textarea className="form-control mt-2" placeholder="Give us an idea of this template is about. This will help you (and others) find it easily.  " id="exampleFormControlTextarea1" rows={4}></textarea>
                  </div>

                  <div className="form-group">
                  <label className="lab" htmlFor="">Make available to the community?</label>
                  <div className="tem-box mt-2">
                  Comunity Template
                  <div className="">
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"></input>
                  </div>
                  </div>
                  </div>
                  
                </form>
                {/* ===== form end ==== */}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <Button2 name="Submit" onClick={handleClickBtn} />
              </div>
            </div>
          </div>
        </div>
        {/* ========= modal box end ========= */}
             <Avatar>A</Avatar>

        <p className="mx-2 mb-0 header-name">Ahmad</p>
        <IconButton
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <ArrowDropDownRoundedIcon />
        </IconButton>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <Link to="/setting">
            <MenuItem onClick={handleClose}>Setting</MenuItem>
          </Link>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
