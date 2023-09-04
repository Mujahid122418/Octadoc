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

import QuestionBar from "../QuestionBarModal/QuestionBar";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/Store";
import { addQuestionModelFun } from "../../../redux/TemplateQuestion/TemplateQuestion";

import { getQuestion } from "../../../redux/TemplateQuestion/TemplateQuestionAPI";
import { useNavigate } from "react-router-dom";
import EditQuestionBar from "../QuestionBarModal/EditQuestionBar";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Margin } from "@mui/icons-material";

// ===== tabs =====

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

// =====tabs end ====

const customRadioStyle = {
  color: "#6049cd", // Your custom color code
};

const RenderQuestion: React.FC<{
  getQuestions: any;
  // onUpdate: (updatedQna: QNAItem[]) => void;
  // onDelete: (updatedQna: QNAItem[]) => void;
}> = ({ getQuestions }) => {
  return (
    <>
      <div>
        {getQuestions?.map((item: any) => (
          <div key={item._id} style={{ padding: 30 }}>
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
            </div>
            {item?.QuestionType === "Date Time" ? (
              <div className="answer mt-3 mb-2 ms-3">
                <div className="first">
                  <label>When did this start?</label>
                  <input type="date" className="date-input" />
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
            ) : item?.QuestionType === "Dosage" ? (
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
                      control={<Radio style={customRadioStyle} />}
                      label="OD"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="start"
                      control={<Radio style={customRadioStyle} />}
                      label="BD"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="bottom"
                      control={<Radio style={customRadioStyle} />}
                      label="TDS"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="end"
                      control={<Radio style={customRadioStyle} />}
                      label="QDS"
                      labelPlacement="top"
                    />
                  </RadioGroup>
                </FormControl>

                <FormControlLabel
                  value="end"
                  control={<Radio style={customRadioStyle} />}
                  label="PRN"
                  labelPlacement="start"
                />
              </div>
            ) : item?.QuestionType === "Free Text" ? (
              <div className="answer mt-3 mb-2 ms-3">
                <div className="first">
                  <input type="text" placeholder="Free Text" />
                </div>
              </div>
            ) : item?.QuestionType === "Multiple Choice" ||
              item?.QuestionType === "Single Choice" ? (
              <div className="answer mt-3 mb-2 ms-3">
                <div className="first">
                  <input
                    disabled
                    value={item.text}
                    type="text"
                    placeholder="Free Text"
                  />
                </div>
              </div>
            ) : null}
            {/* {question.followUp.length > 0 && ( */}
            <RenderQuestion getQuestions={item.followUp} />
            {/* )} */}
          </div>
        ))}
      </div>
    </>
  );
};

const ShowTemplateQuestion = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [section, setSection] = useState([1]);
  const { isLoading, addQuestionModel, getQuestions } = useSelector(
    (state: RootState) => state?.templateQuestion
  );

  let tem_id = window.location.href.split("/questions/")[1];
  useEffect(() => {
    let data = {
      page: 1,
      pageSize: 20,
    };
    dispatch(getQuestion(data));
  }, []);

  const AddQuestionModel = () => {
    try {
      dispatch(addQuestionModelFun(!addQuestionModel));
    } catch (error) {}
  };
  const CopyModel = () => {};
  const AddSection = async (e: any) => {
    console.log("ee", e);

    setSection((current) => [...current, ++e]);
  };
  const EditSection = async (e: any) => {
    console.log("edit", e);
    let id = window.location.href.split("/questions/")[1];
    navigate(`/questions/edit/${id}`);
  };

  // ====tabs======
  const [value, setValue] = useState(0);

  const tabs = [
    { label: "Alice", num: 0 },
    { label: "Bob", num: 1 },
    { label: "Charlie", num: 2 },
    { label: "Maria", num: 3 },
    { label: "oxfod", num: 4 },
    { label: "Numal", num: 5 },
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  // ====tabs end======

  const SectionDetails = section?.map((item, index) => {
    return (
      <>
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
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, border: "none", minWidth: "250px" }}
            >
              {tabs ? (
                tabs.map((item, index) => (
                  <Tab
                    key={index}
                    label={item.label}
                    {...a11yProps(item.num)}
                    sx={{
                      marginTop: "20px",
                      borderRadius: "10px",
                      backgroundColor: "#EDE3FF",
                      width: "90%",
                      "&.Mui-selected": {
                        backgroundColor: "#9d62f5",
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
            </Tabs>

            <div style={{ width: "100%" }}>
              <TabPanel value={value} index={0}>
                <div key={index}>
                  <div className="questions-box">
                    <div className="d-flex justify-content-between ">
                      <h3 className="text-white">Questions </h3>
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
                        <Button2
                          name="Edit"
                          onClick={() => EditSection(item)}
                        />
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
                              (item: any) => item?.template_id === tem_id
                            )
                            .map((item: any, i: Number) => {
                              return (
                                <div key={item._id}>
                                  <RenderQuestion
                                    getQuestions={item.Question}
                                  />
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
                        name="Add Question "
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
              </TabPanel>
              <TabPanel value={value} index={1}>
                Item Two
              </TabPanel>
              <TabPanel value={value} index={2}>
                Item Three
              </TabPanel>
              <TabPanel value={value} index={3}>
                Item Four
              </TabPanel>
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
