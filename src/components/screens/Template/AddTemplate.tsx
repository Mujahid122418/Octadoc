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
import { Link } from "react-router-dom";
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
            {/* <Link to="/questions"> */}
            {Object.keys(selectedTemplate).length > 0 ? (
              <Button2 name="Update" onClick={handleClickBtnUpdate} />
            ) : (
              <Button2 name="Submit" onClick={handleClickBtn} />
            )}
            {/* </Link> */}
          </div>
        </Box>
      </Modal>

      {/* ========modal box========== */}
      {/* <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                New Template
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="bg-white w-100">
                <div className="form-group">
                  <label className="lab" htmlFor="">
                    Title*
                  </label>
                  <input
                    type="text"
                    className="form-control mt-2"
                    aria-describedby="emailHelp"
                    placeholder="What is this template for?"
                  />
                </div>

                <div className="form-group">
                  <label className="lab" htmlFor="">
                    Description*
                  </label>
                  <textarea
                    className="form-control mt-2"
                    placeholder="Give us an idea of this template is about. This will help you (and others) find it easily.  "
                    id="exampleFormControlTextarea1"
                    rows={4}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="lab" htmlFor="">
                    Make available to the community?
                  </label>
                  <div className="tem-box mt-2">
                    Comunity Template
                    <div className="">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckChecked"
                      ></input>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <Button2 name="Submit" onClick={handleClickBtn} />
            </div>
          </div>
        </div>
      </div> */}
      {/* ========= modal box end ========= */}
    </div>
  );
};
export default AddTemplate;

{
  /* <div
// className="modal-dialog"
//   style={{ width: "300px", display: "flex", justifyContent: "center" }}
>
  <div>
    <div>
      <h1 className="modal-title fs-5" id="exampleModalLabel">
        New Template
      </h1>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
    </div>
    <div className="modal-body">
      <form className="bg-white w-100">
        <div className="form-group">
          <label className="lab" htmlFor="">
            Title*
          </label>
          <input
            type="text"
            className="form-control mt-2"
            aria-describedby="emailHelp"
            placeholder="What is this template for?"
         
          />
        </div>

        <div className="form-group">
          <label className="lab" htmlFor="">
            Description*
          </label>
          <textarea
            className="form-control mt-2"
            placeholder="Give us an idea of this template is about. This will help you (and others) find it easily.  "
            id="exampleFormControlTextarea1"
            rows={4}
         
          ></textarea>
        </div>

        <div className="form-group">
          <label className="lab" htmlFor="">
            Make available to the community?
          </label>
          <div className="tem-box mt-2">
            Comunity Template
            <div className="">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckChecked"
             
              ></input>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-dismiss="modal"
      >
        Close
      </button>
      <Button2 name="Submit" onClick={handleClickBtn} />
    </div>
  </div>
</div> */
}
