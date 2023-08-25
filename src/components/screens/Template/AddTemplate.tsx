import React, { useEffect, useState } from "react";
import Button2 from "../Button2/Button2";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../redux/Store";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
  addTemplate,
  getTemplates,
  updateTemplate,
} from "../../../redux/Template/TemplateAPI";
import { toast } from "react-toastify";
import { AppDispatch } from "../../../redux/Store";
import "./ModalBox.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { addTemplateModelFun } from "../../../redux/Template/TemplateSlice";

const AddTemplate: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { addTemplateModel, selectedTemplate } = useSelector(
    (state: RootState) => state?.template
  );
  const { user } = useSelector((state: RootState) => state?.auth);


  

  const [open, setOpen] = React.useState<boolean>(false);
  // form states start
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [category_id , setcategory] = useState("");
  
  const [community, setCommunity] = useState(false);
 
  
  //   form states end

  const handleClose = () => {
    // setOpen(false);
    dispatch(addTemplateModelFun(true));
  };

  useEffect(() => {
    setName(selectedTemplate?.template_name);
    setdescription(selectedTemplate?.description);
    setCommunity(selectedTemplate?.isapprove);
  }, [selectedTemplate]);
  useEffect(() => {
    // let v = addTemplateModel
    setOpen(!addTemplateModel);
  }, [addTemplateModel]);

  const handleClickBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let data = {
      template_name: name,
      description: description,
      category_id: category_id,
      isapprove: community === true ? true : false,
      user_id: user?._id,
    };
    console.log("send data", data);

    dispatch(addTemplate(data))
      .unwrap()
      .then((response) => {
        console.log("respoce", response);

        toast.success("Template Added successfully");
        dispatch(getTemplates());
        dispatch(addTemplateModelFun(true));
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const handleClickBtnUpdate = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    let data = {
      id: selectedTemplate?._id,
      template_name: name,
      description: description,
      isapprove: community === true ? true : false,
      user_id: user?._id,
    };

    dispatch(updateTemplate(data))
      .unwrap()
      .then((response) => {
        toast.success("Template Upated successfully");
        dispatch(getTemplates());
        dispatch(addTemplateModelFun(true));
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open Child Modal</Button> */}
      <Modal open={open} onClose={handleClose}>
        <Box className="modalStyle">
          <div className="modal-header">
            <h1 className="modal-title fs-5">New Template</h1>
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
                <label className="lab" htmlFor="">
                  Title*
                </label>
                <input
                  type="text"
                  className="form-control mt-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="What is this template for?"
                />
              </div>

              <div className="form-group">
                <label className="lab" htmlFor="">
                  Description*
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                  className="form-control mt-2"
                  placeholder="Give us an idea of this template is about. This will help you (and others) find it easily.  "
                  rows={4}
                ></textarea>
              </div>

              <div className="position-relative">
                    <select
                      className="form-control select-arrow"
                      id="customSelect"
                      value={category_id}
                      onChange={(e) => setcategory(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option>Addiction Medicine</option>
                      <option>Anaesthesia</option>
                      <option>Antenatal</option>
                      <option>Bariatric Medicine</option>
                      <option>Cardiology</option>
                      <option>Children’s Health</option>
                      <option>Chronic Disease Management</option>
                      <option>Dermatology</option>
                      <option>Drugs & Alcohol</option>
                      <option>Emergency</option>
                      <option>Endocrinology</option>
                      <option>ENT</option>
                      <option>Fertility</option>
                      <option>Gastroenterology</option>
                      <option>General Surgery</option>
                      <option>Genetics</option>
                      <option>Geriatric Medicine</option>
                      <option>Haematology</option>
                      <option>Immunisations</option>
                      <option>Immunology</option>
                      <option>Infectious Diseases</option>
                      <option>Maxillo Facial</option>
                      <option>Men’s Health</option>
                      <option>Mental Health</option>
                      <option>Nephrology</option>
                      <option>Neurology</option>
                      <option>Occupational Medicine</option>
                      <option>Oncology</option>
                      <option>Ophthalmology</option>
                      <option>Ortho/MSK</option>
                      <option>Pain Medicine</option>
                      <option>Palliative Care</option>
                      <option>Pathology</option>
                      <option>Preventative Medicine</option>
                      <option>Procedures</option>
                      <option>Respiratory</option>
                      <option>Rheumatology</option>
                      <option>Sexual health</option>
                      <option>Vascular Surgery</option>
                      <option>Women's Health</option>
                      <option>Other</option>
                    </select>
                    <ArrowDropDownIcon className="mui-select-arrow" />
              </div>

              <div className="form-group">
                <label className="lab">Make available to the community?</label>
                <div className="tem-box mt-2">
                  Comunity Template
                  <div className="">
                    <input
                      // value={community}
                      onChange={(e) => setCommunity(e.target.checked)}
                      className="form-check-input"
                      type="checkbox"
                    ></input>
                  </div>
                </div>
              </div>
            </form>
            {/* ===== form end ==== */}
          </div>
          <div className="modal-footer">
            {Object.keys(selectedTemplate).length > 0 ? (
              <Button2 name="Update" onClick={handleClickBtnUpdate} />
            ) : (
              <Button2 name="Submit" onClick={handleClickBtn} />
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default AddTemplate;
