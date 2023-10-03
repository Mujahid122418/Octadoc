import { useEffect, useState } from "react";
import "./TemplateQuestion.css";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Button2 from "../Button2/Button2";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import HighlightAltIcon from "@mui/icons-material/HighlightAlt";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import type { RootState } from "../../../redux/Store";
import Stack from "@mui/material/Stack";
import QuestionBar from "../QuestionBarModal/QuestionBar";
// import Draggable from "react-draggable";
import ReactDragListView from "react-drag-listview";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/Store";
import {
  EditSelectedQuestionFun,
  ParentId_Fun,
  addQuestionModelFun,
  editQuestionModelFun,
} from "../../../redux/TemplateQuestion/TemplateQuestion";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  getQuestion,
  getAnswers,
  DeleteQuestion,
} from "../../../redux/TemplateQuestion/TemplateQuestionAPI";
import { useNavigate } from "react-router-dom";
import EditQuestionBar, {
  customRadioStyle,
} from "../QuestionBarModal/EditQuestionBar";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Box from "@mui/material/Box";

import AddIcon from "@mui/icons-material/Add";
import {
  IconButton,
  Tooltip,
  Modal,
  CircularProgress,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteSection, getSection } from "../../../redux/Section/SectionAPI";
import SectionModal from "./SectionModel";
import { activeSectionFun } from "../../../redux/Section/SectionSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { Baseurl } from "../../../utils/BaseUrl";
import { getTemplates } from "../../../redux/Template/TemplateAPI";

// ===== tabs =====

const tabscolor = "#F2EBEF";
const activetabColor = "#9F496E";

interface Item {
  _id: string;
  // Add other properties as needed
}
// =====tabs end ====

const ShowTemplateQuestion = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [section, setSection] = useState([1]);
  const [openSection, setOpenSection] = useState(false);
  const [upSection, setupSection] = useState({});

  // active tab
  const [activeTab, setActiveTab] = useState<Item[]>([]);

  const { isLoading, addQuestionModel, getQuestions, editQuestionModel } =
    useSelector((state: RootState) => state?.templateQuestion);
  const { template } = useSelector((state: RootState) => state?.template);
  // model state start
  const [open, setOpen] = useState(false);
  const [delete_item, setDelete_item] = useState("");
  // template name
  const [TemplateName, setTemplateName] = useState("");
  const handleClose = () => {
    setOpen(false);
  };

  // model state end
  // handel section start
  const {
    section: sectionData,
    activeSection,
    isLoading: isLoadingSecton,
  } = useSelector((state: RootState) => state?.section);
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

  // handel section end
  let tem_id = window.location.href.split("/questions/")[1];
  useEffect(() => {
    let data = {
      page: 1,
      pageSize: 20,
      tempplate_id: tem_id,
    };
    dispatch(getQuestion(data));
    dispatch(getAnswers(data));
    dispatch(getSection(data));
  }, []);

  // console.log("tem_id", tem_id);

  const AddQuestionModel = async () => {
    if (!activeSection) {
      toast.error("Please Select Active Section.");
    } else {
      try {
        localStorage.removeItem("last_question_id");
        dispatch(addQuestionModelFun(!addQuestionModel));
      } catch (error) {}
    }
  };

  // ====tabs======
  const [value, setValue] = useState("");
  const [sectionName, setSectionName] = useState("");
  // ====tabs end======

  const updateTemplateQuestion = async (e: any) => {
    dispatch(EditSelectedQuestionFun(e));
    dispatch(editQuestionModelFun(!editQuestionModel));
    dispatch(ParentId_Fun(e._id));
  };
  const DeleteTemplateQuestion = async (id: any) => {
    let data = {
      questionId: id,
    };
    dispatch(DeleteQuestion(data))
      .unwrap()
      .then((res) => {
        let data = {
          page: 1,
          pageSize: 20,
        };
        dispatch(getQuestion(data));
      })
      .catch((e) => {
        console.log("delete question", e);
      });
  };
  useEffect(() => {
    dispatch(getTemplates());
  }, [dispatch]);
  const init = async () => {
    let data = await template.filter((item) => item?._id == tem_id);

    let name = data[0]?.template_name;

    setTemplateName(name ? name : "");
  };
  useEffect(() => {
    init();
  }, [tem_id, template]);

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

  const SectionDetails = section?.map((item, index) => {
    return (
      <div key={index}>
        {/* handel model start */}
        <Modal
          open={open}
          // onClose={handleClose}
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
        <SectionModal
          openSection={openSection}
          setOpenSection={setOpenSection}
          upSection={upSection}
          setupSection={setupSection}
        />

        {/* ======= tabs ====== */}

        <div className="container">
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "background.paper",
              display: "flex",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <ReactDragListView {...dragProps}>
                {sectionArry?.length ? (
                  sectionArry.map((item: any, i: any) => (
                    <div
                      style={{
                        width: 220,
                        // marginTop: 20,
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
                          borderRadius: activeTab.includes(item)
                            ? "10px"
                            : "5px",
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
                            aria-label="delete"
                            onClick={() => {
                              setOpenSection(true);
                              setupSection(item);
                            }}
                            sx={{ width: 30, height: 30 }}
                          >
                            <EditIcon sx={{ width: 15, height: 15 }} />
                          </IconButton>

                          <IconButton
                            aria-label="delete"
                            className="action-btn"
                            sx={{ width: 30, height: 30 }}
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

            <div style={{ width: "100%" }}>
              <div key={index}>
                <div className="questions-box">
                  <div className="d-flex justify-content-between ">
                    <h3 className="text-white">
                      {TemplateName ? TemplateName : "Template Name"}
                    </h3>
                  </div>
                  <div className="question-head">
                    {/* <HelpOutlineIcon className="icon-size" />{" "} */}
                    <h5 className="mb-0 ms-1">
                      {sectionName ? sectionName : "Select Section"}{" "}
                    </h5>
                  </div>

                  <div className="question-body">
                    <ul className="mt-4 mb-4">
                      {getQuestions?.filter(
                        (item: any) => item?.template_id === tem_id
                      )?.length > 0 ? (
                        getQuestions
                          ?.filter(
                            (item: any) =>
                              item?.template_id === tem_id &&
                              item.section_id === activeSection
                          )
                          .map((item: any, i: Number) => {
                            return (
                              <div key={item._id}>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    alignItems: "center",
                                  }}
                                >
                                  <div>
                                    <li>
                                      <ArrowForwardIosRoundedIcon className="icon-size" />
                                      {item?.question}
                                      {item?.tip && (
                                        <Tooltip title={item?.tip}>
                                          <IconButton
                                            style={{
                                              backgroundColor: "#949396",
                                              width: 20,
                                              height: 20,
                                              marginLeft: 5,
                                            }}
                                          >
                                            <PriorityHighIcon
                                              sx={{
                                                width: 15,
                                                color: "white",
                                              }}
                                            />
                                          </IconButton>
                                        </Tooltip>
                                      )}
                                    </li>
                                  </div>

                                  <div>
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                      }}
                                    >
                                      <IconButton
                                        aria-label="edit"
                                        onClick={() =>
                                          updateTemplateQuestion(item)
                                        }
                                      >
                                        <EditIcon className="icon-size" />
                                      </IconButton>
                                      <IconButton
                                        aria-label="delete"
                                        onClick={() =>
                                          DeleteTemplateQuestion(item?._id)
                                        }
                                      >
                                        <DeleteIcon className="icon-size" />
                                      </IconButton>
                                      <Tooltip title="Add Followup">
                                        <IconButton
                                          onClick={() =>
                                            updateTemplateQuestion(item)
                                          }
                                        >
                                          <AddIcon className="icon-size" />
                                        </IconButton>
                                      </Tooltip>
                                    </Stack>
                                  </div>
                                </div>

                                {item?.questionType === "Date Time" ? (
                                  <div className="answer mt-3 mb-2 ms-3">
                                    <div className="first">
                                      <label>When did this start?</label>
                                      <input
                                        type="date"
                                        className="date-input"
                                      />
                                    </div>
                                    <h6 className="mx-3 mb-0">OR</h6>
                                    <div className="time">
                                      <label htmlFor="">How long age?</label>
                                      <div className="time-in">
                                        <input type="text" />
                                        <select
                                          className="ms-2"
                                          aria-label="Default select example"
                                        >
                                          <option selected>Hours</option>
                                          <option value="1">days</option>
                                          <option value="2">Weeks</option>
                                          <option value="3">Months</option>
                                          <option value="3">Years</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                ) : item?.questionType === "Dosage" ? (
                                  <div className="answer mt-3 mb-2 ms-3">
                                    <div className="first">
                                      <label>When did this start?</label>
                                      <input type="text" />
                                      <b className="mg"> mg</b>
                                    </div>
                                    <FormControl>
                                      <RadioGroup
                                        row
                                        aria-labelledby="demo-form-control-label-placement"
                                        name="position"
                                        defaultValue="top"
                                        sx={{
                                          border: "1px solid #6049cd",
                                          borderRadius: "20px",
                                          marginLeft: "20px",
                                        }}
                                      >
                                        <FormControlLabel
                                          value="top"
                                          control={
                                            <Radio style={customRadioStyle} />
                                          }
                                          label="OD"
                                          labelPlacement="top"
                                        />
                                        <FormControlLabel
                                          value="start"
                                          control={
                                            <Radio style={customRadioStyle} />
                                          }
                                          label="BD"
                                          labelPlacement="top"
                                        />
                                        <FormControlLabel
                                          value="bottom"
                                          control={
                                            <Radio style={customRadioStyle} />
                                          }
                                          label="TDS"
                                          labelPlacement="top"
                                        />
                                        <FormControlLabel
                                          value="end"
                                          control={
                                            <Radio style={customRadioStyle} />
                                          }
                                          label="QDS"
                                          labelPlacement="top"
                                        />
                                      </RadioGroup>
                                    </FormControl>

                                    <FormControlLabel
                                      value="end"
                                      control={
                                        <Radio style={customRadioStyle} />
                                      }
                                      label="PRN"
                                      labelPlacement="start"
                                    />
                                  </div>
                                ) : item?.questionType === "Free Text" ? (
                                  <div className="answer mt-3 mb-2 ms-3">
                                    <div className="first">
                                      <input
                                        type="text"
                                        placeholder="Free Text"
                                      />
                                    </div>
                                  </div>
                                ) : item?.questionType === "Multiple Choice" ? (
                                  <div>
                                    {item?.answer?.length > 0 && (
                                      <ul>
                                        {item?.answer.map(
                                          (item: any, index: any) => (
                                            <li key={index}> {item}</li>
                                          )
                                        )}
                                      </ul>
                                      // <FormControlLabel
                                      //   className="ms-1"
                                      //   control={
                                      //     <Checkbox
                                      //       defaultChecked
                                      //       style={customRadioStyle}
                                      //     />
                                      //   }
                                      //   label={item?.answer}
                                      // />
                                    )}
                                    {item?.followUp.map((e1: any, i: any) => {
                                      return (
                                        <>
                                          <div style={{ padding: 20 }}>
                                            <li>
                                              {++i}:- {e1.question}
                                            </li>
                                            {e1?.answer.map((item: any) => (
                                              <li>{item}</li>
                                            ))}
                                          </div>
                                          {/* <button
                                            onClick={() =>
                                              EditFollow(e1, item._id)
                                            }
                                          >
                                            edit
                                          </button> */}
                                        </>
                                      );
                                    })}
                                  </div>
                                ) : item?.questionType === "Single Choice" ? (
                                  <div>
                                    {item?.answer && (
                                      <input
                                        disabled
                                        value={item?.answer}
                                        type="text"
                                        placeholder="Free Text"
                                      />
                                    )}

                                    {item?.followUp.map((e1: any) => {
                                      return (
                                        <div className=" mt-3 mb-2 ms-3">
                                          <li> {e1?.question}</li>
                                          <div className="first">
                                            <input
                                              disabled
                                              value={e1?.answer}
                                              type="text"
                                              placeholder="Free Text"
                                            />
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                ) : null}
                              </div>
                            );
                          })
                      ) : (
                        <p style={{ textAlign: "center" }}>No Record Found</p>
                      )}
                    </ul>
                  </div>
                  <div className="question-footer">
                    <Button2
                      name="Add Question"
                      onClick={AddQuestionModel}
                      icon={<HelpCenterIcon />}
                    />
                    <Button2
                      name="Add Section"
                      // onClick={() => AddSection(item)}
                      onClick={() => setOpenSection(true)}
                      icon={<HighlightAltIcon />}
                    />
                    <QuestionBar />
                    <EditQuestionBar />
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </div>

        {/* =====tabs end ====== */}
      </div>
    );
  });

  return (
    <div>
      <div>{SectionDetails}</div>
    </div>
  );
};

export default ShowTemplateQuestion;
