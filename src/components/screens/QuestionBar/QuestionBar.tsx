import React ,{useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import CloseIcon from '@mui/icons-material/Close'; 
import './QuestionBar.css';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from '@mui/material/Checkbox';

import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Button2 from '../Button2/Button2';
import AddIcon from '@mui/icons-material/Add';
import AnswerBar from './Answerpart/AnswerPart';

const customRadioStyle = {
    color: '#6049cd', // Your custom color code
  };

type Anchor = 'right';

export default function QuestionBar() {

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
      sx={{ width: 550 }}
      role="presentation"

    >
      <IconButton
        sx={{ ml: 'auto' }}
         onClick={toggleDrawer(anchor, false)} 
      >
        <CloseIcon />
      </IconButton>
      <List className='p-3 qu-bar'>
        <h2 className='mb-1'>Add New Question</h2>
        <p>Section Name</p>
        <label htmlFor="">Question</label>
        <input type="text" placeholder='What do you want to ask?' onClick={handleInputClick} />
        <FormControlLabel className='ms-1' control={<Checkbox defaultChecked  style={customRadioStyle} />} label="Hide this from your clinical notes" />


    <div className="label-button">
    <label htmlFor="">Answer</label>
    <Button2 name='Add' onClick={handleClickBtn} icon={<AddIcon />} />
    <AnswerBar />
    </div>
    <textarea name="" id="" cols={30} rows={5} />
    <div className="save-button mt-2">
    <Button2  name="Save Question " onClick={handleClickBtn}  />
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
      <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}

        PaperProps={{
          className: 'responsive-sidebar', // Use the custom class for responsive behavior
          sx: {
            width: 550, // Set the width for larger screens
          },
        }}
      >
        {list(anchor)}
      </Drawer>
    </div>
  );
}
