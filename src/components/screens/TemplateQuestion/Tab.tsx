import { useEffect, useState } from "react";

import "./TemplateQuestion.css";
import ReactDragListView from "react-drag-listview";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/Store";
import type { RootState } from "../../../redux/Store";
import { IconButton, Modal, CircularProgress, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Baseurl } from "../../../utils/BaseUrl";
import { toast } from "react-toastify";
import { getSection, deleteSection } from "../../../redux/Section/SectionAPI";
import { activeSectionFun } from "../../../redux/Section/SectionSlice";
import Button2 from "../Button2/Button2";
import SectionModal from "./SectionModel";
import { isPurchasedModelFun } from "../../../redux/Auth/AuthSlice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "white",
  // border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

// ===== tabs =====

const tabscolor = "#F2EBEF";
const activetabColor = "#9F496E";
interface Item {
  _id: string;
  // Add other properties as needed
}

// =====tabs end ====
interface ModelProps {
  openSection: boolean;
  setOpenSection: (value: any) => void;
  setSectionName: (value: any) => void;
}
const SectionTabs: React.FC<ModelProps> = ({
  openSection,
  setOpenSection,
  setSectionName,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  let tem_id = window.location.href.split("/questions/")[1];
  const { user } = useSelector((state: RootState) => state?.auth);
  // ====tabs======

  const [value, setValue] = useState("");

  const [upSection, setupSection] = useState({});
  // ====tabs end======
  // active tab
  const [activeTab, setActiveTab] = useState<Item[]>([]);
  const {
    section: sectionData,
    activeSection,
    isLoading: isLoadingSecton,
  } = useSelector((state: RootState) => state?.section);

  // model state start
  const [open, setOpen] = useState(false);
  const [delete_item, setDelete_item] = useState("");

  const [sectionArry, setSectionArry] = useState<any>([]);
  useEffect(() => {
    setSectionArry(sectionData);
  }, [sectionData]);

  const updateOrder = async (data: any) => {
    let res = await axios.post(Baseurl + `/section/sectionUpdateMany`, data);

    if (res.data.success) {
      toast.success(res.data.message);

      let data = {
        page: 1,
        pageSize: 20,
        tempplate_id: tem_id,
      };

      dispatch(getSection(data));
    }
  };
  const dragProps = {
    onDragEnd(fromIndex: any, toIndex: any) {
      const newColumns = [...sectionArry];

      const item = newColumns.splice(fromIndex, 1)[0];

      newColumns.splice(toIndex, 0, item);
      setSectionArry(newColumns);
      const updatedItems = newColumns.map((item, index) => {
        return {
          ...item,
          order: index + 1,
        };
      });

      updateOrder(updatedItems);
      // console.log("data", data);
    },
    nodeSelector: "div",
  };
  const HandelDeleteSection = () => {
    dispatch(deleteSection(delete_item)).then((res) => {
      setOpen(!open);
      let data = {
        page: 1,
        pageSize: 20,
        tempplate_id: tem_id,
      };
      dispatch(getSection(data));
    });
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <SectionModal
        openSection={openSection}
        setOpenSection={setOpenSection}
        upSection={upSection}
        setupSection={setupSection}
      />
      {/* handel model start */}
      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }}>
          <h2 id="parent-modal-title">
            Are you sure you want to delete this Section?
          </h2>
          <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            {isLoadingSecton ? (
              <CircularProgress
                color="inherit"
                size={20}
                sx={{ mr: 2, mt: 1 }}
              />
            ) : (
              <Button2 name="Delete" onClick={() => HandelDeleteSection()} />
            )}
            <Button2 name="Cancel" onClick={handleClose} />
          </div>
        </Box>
      </Modal>

      {/* handel model end  */}
      <div 
      
      className="tabs-scroll"
      
      >
        <ReactDragListView {...dragProps}>
          {sectionArry?.length ? (
            sectionArry.map((item: any, i: any) => (
              <div
                style={{
                  width: 220,
                  // marginTop: 20,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <button
                  className="btn btn-template mx-2"
                  onClick={() => {
                    setValue(item?._id);
                    setSectionName(item?.name);
                    dispatch(activeSectionFun(item?._id));
                    activeTab.includes(item)
                      ? setActiveTab(activeTab.filter((i) => i !== item))
                      : setActiveTab([item]);
                  }}
                  style={{
                    border: "none",
                    display: "flex",
                    justifyItems: "center",
                    alignItems: "center",
                    height: 50,
                    textAlign: "center",
                    marginTop: "20px",
                    justifyContent: "center",
                    backgroundColor: activeTab.includes(item)
                      ? activetabColor
                      : tabscolor,

                    width: activeTab.includes(item) ? "100%" : "90%",

                    color: activeTab.includes(item) ? "white" : "black",
                    borderBottomColor: activeTab.includes(item)
                      ? "black"
                      : "#9d62f5",
                    borderBottomWidth: "2px",
                    borderRadius: activeTab.includes(item) ? "10px" : "5px",
                    clipPath: activeTab.includes(item)
                      ? "polygon(0% 0%, 91% 0, 100% 50%, 90% 100%, 0% 100%)"
                      : "black",
                  }}
                >
                  {item?.name}
                </button>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",

                    marginRight: "8%",
                  }}
                >
                  <div style={{ marginTop: -15 }}>
                    <IconButton
                      className="action-btn"
                      disabled={user?.isPurchased ? false : true}
                      aria-label="delete"
                      onClick={() => {
                        setOpenSection(true);
                        setupSection(item);
                      }}
                      sx={{
                        width: 30,
                        height: 30,
                        opacity: user?.isPurchased ? 1 : 0.7,
                      }}
                    >
                      <EditIcon sx={{ width: 15, height: 15 }} />
                    </IconButton>

                    <IconButton
                      aria-label="delete"
                      className="action-btn"
                      disabled={user?.isPurchased ? false : true}
                      sx={{
                        width: 30,
                        height: 30,
                        opacity: user?.isPurchased ? 1 : 0.7,
                      }}
                      onClick={() => {
                        setOpen(!open);
                        setDelete_item(item._id);
                      }}
                    >
                      <DeleteIcon sx={{ width: 15, height: 15 }} />
                    </IconButton>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>you did not have any tabs</p>
          )}
        </ReactDragListView>
      </div>
    </div>
  );
};

export default SectionTabs;
