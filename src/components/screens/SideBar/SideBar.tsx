import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { Home as HomeIcon, Menu as MenuIcon } from '@mui/icons-material';
import './SideBar.css';

const SideBar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <IconButton onClick={toggleSidebar} className="toggle-btn">
        <MenuIcon />
      </IconButton>
      <Drawer open={isSidebarOpen} onClose={toggleSidebar} anchor="left">
        <div className="sidebar-content" onClick={toggleSidebar}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            {/* Add more sidebar items here */}
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default SideBar;
