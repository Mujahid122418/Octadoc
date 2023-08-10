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


import { useDispatch } from "react-redux";
import { addTemplateModelFun } from "../../../redux/Template/TemplateSlice";

const Header = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickBtn = (event: any) => {
    event.preventDefault();
    dispatch(addTemplateModelFun(false));
  };
  return (
    <div className="header">
      <div className=" d-flex align-items-center justify-content-end">
        <IconButton>
          <HelpOutlineIcon />
        </IconButton>

        <Button2 name="New Templates 2" onClick={handleClickBtn} />

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
