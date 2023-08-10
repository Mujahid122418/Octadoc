import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Button2 from '../Button2/Button2';
import './ModalBox.css'



const ModalBox: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Open Modal
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className='modalStyle'>
        <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                 New Template
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
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
                <Button2 name="Submit" onClick={handleClickBtn} />
              </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalBox;
