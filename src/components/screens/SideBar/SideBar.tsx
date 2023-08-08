import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Home as HomeIcon, Menu as MenuIcon } from "@mui/icons-material";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import PublicIcon from "@mui/icons-material/Public";
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
          <List>
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
              <ListItemText primary="Home" className="list-text" />
            </ListItem>

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
              <ListItemText primary="My Templates" className="list-text" />
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
              <ListItemText
                primary="Community Templates"
                className="list-text"
              />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default SideBar;
