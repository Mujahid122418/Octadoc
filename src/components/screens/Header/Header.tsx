import React, { useEffect } from "react";

import "./Header.css";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import IconButton from "@mui/material/IconButton";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import Button2 from "../Button2/Button2";
import type { RootState } from "../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { addTemplateModelFun } from "../../../redux/Template/TemplateSlice";
import { useNavigate } from "react-router-dom";
import { getMeFun } from "../../../redux/Auth/AuthAPI";
import { AppDispatch } from "../../../redux/Store";
import { Fade } from "react-reveal";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate(); // Use useNavigate hook to access navigation
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { user } = useSelector((state: RootState) => state?.auth);

  const init = async () => {
    let token = await localStorage.getItem("token");
    let user = await localStorage.getItem("user");
    if (token && user) {
      let data = {
        id: user,
      };
      dispatch(getMeFun(data));
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    init();
  }, []);

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

  const Logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.log("error", error);
    }
  };
  let checkPath =
    window.location.pathname === "/" ||
    window.location.pathname === "/template" ||
    window.location.pathname === "/community";
  return (
    <div className="header">
      <div className="d-flex align-items-center justify-content-end">
        <IconButton>
          <HelpOutlineIcon />
        </IconButton>
        {checkPath && (
          <Button2 name="New Templates " onClick={handleClickBtn} />
        )}
        <Avatar>A</Avatar>
        <p className="mx-2 mb-0 header-name">{user?.name}</p>
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
          <Link to="/profile">
            <MenuItem onClick={handleClose}>Profile</MenuItem>
          </Link>
          {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
          <Link to="/admin">
            <MenuItem onClick={handleClose}>Admin</MenuItem>
          </Link>
          <Link to="/category">
            <MenuItem onClick={handleClose}>Category</MenuItem>
          </Link>
          <Link to="/interest">
            <MenuItem onClick={handleClose}>Interest</MenuItem>
          </Link>
          <Link to="/setting">
            <MenuItem onClick={handleClose}>Setting</MenuItem>
          </Link>
          <Link to="/contact">
            <MenuItem onClick={handleClose}>Contact</MenuItem>
          </Link>
          <Link to="/payment">
            <MenuItem onClick={handleClose}>Payment Method</MenuItem>
          </Link>
          <MenuItem onClick={Logout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
