import React ,{useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import CloseIcon from '@mui/icons-material/Close'; 
import './AnswerBar.css';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from '@mui/material/Checkbox';


import AddIcon from '@mui/icons-material/Add';
import Button2 from '../../Button2/Button2';



const customRadioStyle = {
    color: '#6049cd', 
  };

type Anchor = 'right';

export default function AnswerBar() {

  const handleClickBtn = (event: any) => {
    event.preventDefault();
  };

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
        <h2 className='mb-1'>Add Answer to</h2>
    
        <label htmlFor="">Answer</label>
        <input type="text" placeholder='Add Your Answer' onClick={handleInputClick} />
        <FormControlLabel className='ms-1' control={<Checkbox defaultChecked  style={customRadioStyle} />} label="Hide this from your clinical notes" />
    {/* ===collpase==== */}
    <div className='mt-3'>
      <h6 className='coll' >
       No Tip
      </h6>
     
        <div>
          <div className="coll-body">
            <div className="coll-band">
                <p className='mb-0'>Text that will appear in the patient notes</p>
            </div>
            <input className='mt-2 ms-0' type="text" placeholder='add Out Put Text' />
          </div>
        </div>
  
    </div>
    {/* ===collpase==== */}


    <div className="label-button mt-4">
  <label htmlFor="">Follow Up Question</label>
    <Button2 name='Add' onClick={handleClickBtn} icon={<AddIcon />} />
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
