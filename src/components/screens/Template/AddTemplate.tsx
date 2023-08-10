import React, { useEffect, useState } from "react";
import Button2 from "../Button2/Button2";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../redux/Store";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { addTemplate, getTemplates } from "../../../redux/Template/TemplateAPI";
import { toast } from "react-toastify";
import { AppDispatch } from "../../../redux/Store";
import './ModalBox.css'
import { Link } from 'react-router-dom';
import { addTemplateModelFun } from "../../../redux/Template/TemplateSlice";

const AddTemplate: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { addTemplateModel } = useSelector(
    (state: RootState) => state?.template
    
  );
  const [open, setOpen] = React.useState<boolean>(false);
  // form states start
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [community, setCommunity] = useState(false);
  //   form states end

  const handleClose = () => {
    // setOpen(false);
 
    dispatch(addTemplateModelFun(true));
  };
  console.log("addTemplateModel", addTemplateModel);
  
  useEffect(() => {
    // let v = addTemplateModel
     setOpen(!addTemplateModel);
  }, [addTemplateModel]);

 
  const handleClickBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let data = {
      template_name: name,
      description: description,
      isapprove: community,
    };
    dispatch(addTemplate(data))
      .unwrap()
      .then((response) => {
        toast.success("Template Added successfully");
        dispatch(getTemplates());
      })
      .catch((error) => {
        toast.error(error);
      });
    console.log("data", data);
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open Child Modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box className='modalStyle'>
        <div className="modal-header">
                <h1 className="modal-title fs-5">
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
                      onChange={(e) => setName(e.target.value)}
                      placeholder="What is this template for?"
                    />
                  </div>

                  <div className="form-group">
                  <label className="lab" htmlFor="">Description*</label>
                  <textarea    onChange={(e) => setdescription(e.target.value)} className="form-control mt-2" placeholder="Give us an idea of this template is about. This will help you (and others) find it easily.  "  rows={4}></textarea>
                  </div>

                  <div className="form-group">
                  <label className="lab" >Make available to the community?</label>
                  <div className="tem-box mt-2">
                  Comunity Template
                  <div className="">
                  <input    onChange={(e) => setCommunity(e.target.checked)} className="form-check-input" type="checkbox"></input>
                  </div>
                  </div>
                  </div>
                  
                </form>
                {/* ===== form end ==== */}
              </div>
              <div className="modal-footer">
               <Link to='/questions'>
               <Button2 name="Submit" onClick={handleClickBtn} />
               </Link>
              </div>
        </Box>
      </Modal>

    </div>
  );
};
export default AddTemplate;

