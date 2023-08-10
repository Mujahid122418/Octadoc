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


const customRadioStyle = {
    color: '#6049cd', // Your custom color code
  };

type Anchor = 'right';

export default function QuestionBar() {

    // ===collpase====
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  
    // ===collpase end====

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
    {/* ===collpase==== */}
    <div>
      <h5 className='coll' onClick={handleExpandClick}>
        Tip
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </h5>
      <Collapse in={expanded}>
        <div>
          <div className="coll-body">
            <div className="coll-band">
                <p className='mb-0'>The info symbol appears next to the question to help you recall any significant information regarding that question.</p>
            </div>
            <input className='mt-2 ms-0' type="text" placeholder='Question Help text' />
          </div>
        </div>
      </Collapse>
    </div>
    {/* ===collpase==== */}
    <div className="selectt-box mt-3">
        <label htmlFor="">Type*</label>
        <select className="form-select mt-1">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
        </select>
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
      >
        {list(anchor)}
      </Drawer>
    </div>
  );
}
