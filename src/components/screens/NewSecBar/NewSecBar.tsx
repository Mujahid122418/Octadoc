import React ,{useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import CloseIcon from '@mui/icons-material/Close'; 
import './NewSecBar.css';
import Button2 from '../Button2/Button2';



type Anchor = 'right';

export default function NewSecBar() {

  const handleClickBtn = (event: any) => {
    event.preventDefault();
  };

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (event.target === event.currentTarget) {
      event.stopPropagation();
    }
  };

  const list = (anchor: Anchor) => (
    <Box
      role="presentation"

    >
      <IconButton
        sx={{ ml: 'auto' }}
         onClick={toggleDrawer(anchor, false)} 
      >
        <CloseIcon />
      </IconButton>
      <List className='p-3 qu-bar'>
        <h2 className='mb-1'>Add New Section</h2>
        <label htmlFor="">Name</label>
        <input type="text" placeholder='Name Your Section' onClick={handleInputClick} />

    <div className="save-button mt-2">
    <Button2  name="Save Section" onClick={handleClickBtn}  />
    </div>
    <div className="close-button mt-2">
    <Button2  name="Close" onClick={handleClickBtn}  />
    </div>
      </List>
    </Box>
  );

  const anchor: Anchor = 'right';

  return (
    <div>
      <Button onClick={toggleDrawer(anchor, true)}>Section</Button>
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
        PaperProps={{
          className: 'responsive-sidebar', 
          sx: {
            width: 550,
          },
        }}
      >
        {list(anchor)}
      </Drawer>
    </div>
  );
}
