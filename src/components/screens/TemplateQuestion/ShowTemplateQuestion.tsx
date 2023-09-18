import { useEffect, useState } from "react";
import "./TemplateQuestion.css";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Button2 from "../Button2/Button2";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import HighlightAltIcon from "@mui/icons-material/HighlightAlt";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import type { RootState } from "../../../redux/Store";
import Stack from "@mui/material/Stack";
import QuestionBar from "../QuestionBarModal/QuestionBar";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/Store";
import {
  EditSelectedQuestionFun,
  ParentId_Fun,
  addQuestionModelFun,
  editQuestionModelFun,
} from "../../../redux/TemplateQuestion/TemplateQuestion";

import {
  getQuestion,
  getAnswers,
  DeleteQuestion,
} from "../../../redux/TemplateQuestion/TemplateQuestionAPI";
import { useNavigate } from "react-router-dom";
import EditQuestionBar, {
  customRadioStyle,
} from "../QuestionBarModal/EditQuestionBar";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getSection } from "../../../redux/Section/SectionAPI";
import SectionModal from "./SectionModel";
import { activeSectionFun } from "../../../redux/Section/SectionSlice";
import { toast } from "react-toastify";

// ===== tabs =====

const tabscolor = "#F2EBEF";
const activetab = "#9F496E";

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

// =====tabs end ====

const ShowTemplateQuestion = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [section, setSection] = useState([1]);
  const [openSection, setOpenSection] = useState(false);
  const {
    isLoading,
    addQuestionModel,
    getQuestions,
    editQuestionModel,
    getAnswer,
    EditSelectedQuestion,
  } = useSelector((state: RootState) => state?.templateQuestion);

  // console.log("EditSelectedQuestion", EditSelectedQuestion);

  const { section: sectionData, activeSection } = useSelector(
    (state: RootState) => state?.section
  );

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
  const CopyModel = () => {};

  const AddSection = async (e: any) => {
    setSection((current) => [...current, ++e]);
  };

  const EditSection = async (e: any) => {
    // let id = window.location.href.split("/questions/")[1];
    // navigate(`/questions/edit/${id}`);
  };

  // ====tabs======
  const [value, setValue] = useState("");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    dispatch(activeSectionFun(newValue));
  };

  // ====tabs end======

  const updateTemplateQuestion = async (e: any) => {
    dispatch(EditSelectedQuestionFun(e));
    dispatch(editQuestionModelFun(!editQuestionModel));
    dispatch(ParentId_Fun(e._id));
  };
  const DeleteTemplateQuestion = async (id: any) => {
    dispatch(DeleteQuestion(id))
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

  const SectionDetails = section?.map((item, index) => {
    return (
      <>
        <SectionModal
          openSection={openSection}
          setOpenSection={setOpenSection}
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
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              // onChange={(e) => console.log("e", e)}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, border: "none", minWidth: "250px" }}
            >
              {sectionData?.length ? (
                sectionData.map((item: any, index: any) => (
                  <Tab
                    key={item._id}
                    label={item?.name}
                    {...a11yProps(item._id)}
                    id={item._id}
                    value={item._id}
                    sx={{
                      marginTop: "20px",
                      borderRadius: "10px",
                      backgroundColor: tabscolor,
                      width: "90%",
                      "&.Mui-selected": {
                        backgroundColor: activetab,
                        width: "100%",
                        color: "white",
                        borderBottomColor: "#9d62f5",
                        borderBottomWidth: "2px",
                        borderRadius: "0px",
                        clipPath:
                          "polygon(0% 0%, 91% 0, 100% 50%, 90% 100%, 0% 100%)",
                      },
                    }}
                  />
                ))
              ) : (
                <p>you did not have any tabs</p>
              )}

              {/* <Button2 name="add +" onClick={CopyModel} /> */}

              <Tab
                label="Add +"
                // {...a11yProps(item.num)}
                onClick={() => setOpenSection(true)}
                sx={{
                  marginTop: "20px",
                  borderRadius: "10px",
                  backgroundColor: tabscolor,
                  width: "90%",
                  "&.Mui-selected": {
                    backgroundColor: activetab,
                    width: "100%",
                    color: "white",
                    borderBottomColor: "#9d62f5",
                    borderBottomWidth: "2px",
                    borderRadius: "0px",
                    clipPath:
                      "polygon(0% 0%, 91% 0, 100% 50%, 90% 100%, 0% 100%)",
                  },
                }}
              />
            </Tabs>

            <div style={{ width: "100%" }}>
              {/* <TabPanel value={value} index={0}> */}
              <div key={index}>
                <div className="questions-box">
                  <div className="d-flex justify-content-between ">
                    <h3 className="text-white">Questions</h3>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 2,
                        backgroundColor: "white",
                        padding: "5px",
                        borderRadius: "10px",
                      }}
                    >
                      <Button2 name="Copy" onClick={CopyModel} />
                      <Button2 name="Edit" onClick={() => EditSection(item)} />
                    </div>
                  </div>
                  <div className="question-head">
                    <HelpOutlineIcon />{" "}
                    <h5 className="mb-0 ms-1">Section Name </h5>
                  </div>
                  <div className="question-body">
                    <ul className="mt-4 mb-4">
                      {getQuestions?.filter(
                        (item: any) => item?.template_id === tem_id
                      ).length > 0 ? (
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
                                  <li>
                                    <ArrowForwardIosRoundedIcon />
                                    {item?.question}
                                  </li>
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
                                        <EditIcon />
                                      </IconButton>
                                      <IconButton
                                        aria-label="delete"
                                        onClick={() =>
                                          DeleteTemplateQuestion(item?._id)
                                        }
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                      <Tooltip title="Add Followup">
                                        <IconButton
                                          onClick={() =>
                                            updateTemplateQuestion(item)
                                          }
                                        >
                                          <AddIcon />
                                        </IconButton>
                                      </Tooltip>
                                    </Stack>
                                  </div>
                                </div>
                                {item?.question_type === "Date Time" ? (
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
                                ) : item?.question_type === "Dosage" ? (
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
                                ) : item?.question_type === "Free Text" ? (
                                  <div className="answer mt-3 mb-2 ms-3">
                                    <div className="first">
                                      <input
                                        type="text"
                                        placeholder="Free Text"
                                      />
                                    </div>
                                  </div>
                                ) : item?.question_type ===
                                  "Multiple Choice" ? (
                                  getAnswer
                                    ?.filter(
                                      (e: any) =>
                                        e.follow_up_question_group_id ===
                                        item._id
                                    )
                                    .map((e1: any) => {
                                      return (
                                        <FormControlLabel
                                          className="ms-1"
                                          control={
                                            <Checkbox
                                              defaultChecked
                                              style={customRadioStyle}
                                            />
                                          }
                                          label={e1.answer[0].answer}
                                          // label="sjkdl"
                                        />
                                      );
                                    })
                                ) : item?.question_type === "Single Choice" ? (
                                  getAnswer
                                    ?.filter(
                                      (e: any) =>
                                        e.follow_up_question_group_id ===
                                        item._id
                                    )
                                    .map((e1: any) => {
                                      return (
                                        <div
                                          className=" mt-3 mb-2 ms-3"
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                          }}
                                        >
                                          <div className="first">
                                            <input
                                              disabled
                                              value={e1.answer[0].answer}
                                              type="text"
                                              placeholder="Free Text"
                                            />
                                          </div>
                                        </div>
                                      );
                                    })
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
                      onClick={() => AddSection(item)}
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
      </>
    );
  });

  return (
    <div>
      <div>{SectionDetails}</div>
    </div>
  );
};

export default ShowTemplateQuestion;
