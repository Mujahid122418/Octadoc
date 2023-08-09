import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Link } from 'react-router-dom';
import { Home as HomeIcon, Menu as MenuIcon } from "@mui/icons-material";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import PublicIcon from "@mui/icons-material/Public";
import imageSrc from '../../../assets/purple_logo.png';
import "./SideBar.css";

const SideBar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuItemClick = (itemName: string) => {
    setActiveMenuItem(itemName);
  };
  return (
    <div>
      <IconButton onClick={toggleSidebar} className="toggle-btn">
        <MenuIcon />
      </IconButton>
      <Drawer open={isSidebarOpen} onClose={toggleSidebar} anchor="left">
        <div className="sidebar-content" onClick={toggleSidebar}>
          <div className="logo w-100 ms-2">
            <img style={{width:'100%' , height:'130px'}} src={imageSrc} alt="logo" />
          </div>
          <List>

            <Link to='/'>
            <ListItem
              button
              className={`list-item ${
                activeMenuItem === "Home" ? "active" : ""
              }`}
              onClick={() => handleMenuItemClick("Home")}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <p className="list-text">Home</p>
            </ListItem>
            </Link>

            <ListItem
              button
              className={`list-item ${
                activeMenuItem === "My Templates" ? "active" : ""
              }`}
              onClick={() => handleMenuItemClick("My Templates")}
            >
              <ListItemIcon>
                <StickyNote2Icon />
              </ListItemIcon>
              <p className="list-text">My Templates</p>
            </ListItem>

            <ListItem
              button
              className={`list-item ${
                activeMenuItem === "Community Templates" ? "active" : ""
              }`}
              onClick={() => handleMenuItemClick("Community Templates")}
            >
              <ListItemIcon>
                <PublicIcon />
              </ListItemIcon>
              <p className="list-text">Community Templates</p>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default SideBar;
