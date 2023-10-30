import * as React from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import LoadingButton from "@mui/lab/LoadingButton";
import Button2 from "../Button2/Button2";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../redux/Store";
import {
  addSection,
  getSection,
  updateSection,
} from "../../../redux/Section/SectionAPI";
import { AppDispatch } from "../../../redux/Store";

interface ModelProps {
  openSection: boolean;
  setOpenSection: (value: any) => void;
  upSection: any;
  setupSection: (value: any) => void;
}

const SectionModal: React.FC<ModelProps> = ({
  openSection,
  setOpenSection,
  upSection,
  setupSection,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading } = useSelector((state: RootState) => state?.section);
  // console.log("section ", section);
  const [newname, setnewname] = React.useState("");
  React.useEffect(() => {
    setnewname(upSection.name || "");
  }, [upSection]);

  const [name, setName] = React.useState("");
  // const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpenSection(false);
    setupSection("");
  };
  const onSubmit = () => {
    let template_id =
      window.location.href.split("/questions/edit/")[1] ||
      window.location.href.split("/questions/")[1];
    let data = {
      tempplate_id: template_id,
      name: name,
      order: "",
    };
    let d1 = {
      page: 1,
      pageSize: 20,
      tempplate_id: template_id,
    };
    dispatch(addSection(data)).then(() => {
      dispatch(getSection(d1));
      setOpenSection(false);
    });
  };

  const onUpdate = () => {
    let template_id =
      window.location.href.split("/questions/edit/")[1] ||
      window.location.href.split("/questions/")[1];
    const data = {
      id: upSection._id,
      name: newname,
    };
    let d1 = {
      page: 1,
      pageSize: 20,
      tempplate_id: template_id,
    };
    dispatch(updateSection(data)).then(() => {
      dispatch(getSection(d1));
      setOpenSection(false);
      setupSection("");
    });
  };

  return (
    <div>
      <Modal open={openSection} onClose={handleClose}>
        <Box className="modalStyle">
          <div className="modal-header">
            <h1 className="modal-title fs-5">New Section </h1>
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
                  value={upSection ? newname : name}
                  onChange={(e) => {
                    upSection
                      ? setnewname(e.target.value)
                      : setName(e.target.value);
                  }}
                  placeholder="What is this template for?"
                />
              </div>
            </form>
            {/* ===== form end ==== */}
          </div>
          <div className="modal-footer">
            {isLoading ? (
              <LoadingButton
                loading
                variant="outlined"
                disabled
                sx={{ padding: "5px 30px" }}
              >
                <span>Submit</span>
              </LoadingButton>
            ) : Object.keys(upSection).length > 0 ? (
              <Button2 name="Update" onClick={onUpdate} />
            ) : (
              <Button2 name="Submit" onClick={onSubmit} />
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default SectionModal;
