import { useState, useEffect } from "react";
import "./TemplateQuestion.css";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import type { RootState } from "../../../redux/Store";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/Store";

import DeleteIcon from "@mui/icons-material/Delete";

import IconButton from "@mui/material/IconButton";


import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import {
  DeleteQuestion,
  getQuestion,
} from "../../../redux/TemplateQuestion/TemplateQuestionAPI";
import {
  EditSelectedQuestionFun,
  addQuestionModelFun,
  editQuestionFollowupModelFun,
} from "../../../redux/TemplateQuestion/TemplateQuestion";
import QuestionBar from "../QuestionBarModal/QuestionBar";
import EditQuestionBar from "../QuestionBarModal/EditQuestionBar";
// interface QuestionItem {
//   question: string;
//   QuestionType: string;
//   Qindex: string;
//   followUp: QuestionItem[];
//   _id: string;
// }

// interface DataItem {
//   _id: string;
//   template_id: string;
//   Question: QuestionItem[];
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }
interface Question {
  question: string;
  QuestionType: string;
  Qindex: string;
  followUp: Question[];
  _id: string;
}

interface DataItem {
  _id: string;
  name: string;
  template_id: string;
  question: string;
  Question: Question[];
  createdAt: string;
  updatedAt: string;
  Qindex: string;

  __v: number;
}
const customRadioStyle = {
  color: "#6049cd", // Your custom color code
};

const RenderQuestion: React.FC<{
  getQuestions: any;
  arr: any;
  // onUpdate: (updatedQna: QNAItem[]) => void;
  // onDelete: (updatedQna: QNAItem[]) => void;
}> = ({ getQuestions, arr }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector(
    (state: RootState) => state?.templateQuestion
  );

  const findParent = (
    arr: any,
    text: string,
    parent: DataItem | null = null
  ): DataItem | null => {
    for (const item of arr) {
      // console.log("item check", text, item);
      if (item?.Qindex === text) {
        return parent;
      }
      if (item.Question && item.Question.length > 0) {
        const found = findParent(item?.Question, text, item);

        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  return (
    <div>
      {getQuestions?.map((item: any, i: Number, ques: any) => (
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
              <ArrowForwardIosRoundedIcon /> {item?.question}
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
                  <select className="ms-2" aria-label="Default select example">
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

          <RenderQuestion getQuestions={item.followUp} arr={getQuestions} />
        </div>
      ))}
    </div>
  );
};

const EditTemplateQuestion = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [section, setSection] = useState([1]);
  const {
    isLoading,
    getQuestions,

    editQuestionFollowupModel,
  } = useSelector((state: RootState) => state?.templateQuestion);

  let tem_id = window.location.href.split("/questions/edit/")[1];
  useEffect(() => {
    let data = {
      page: 1,
      pageSize: 20,
    };
    dispatch(getQuestion(data));
  }, []);
  const customRadioStyle = {
    color: "#6049cd", // Your custom color code
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
  const updateTemplateQuestion = async (e: any) => {
    console.log("eee", e.Question);
    dispatch(EditSelectedQuestionFun(e.Question));
    dispatch(editQuestionFollowupModelFun(!editQuestionFollowupModel));
  };
  const SectionDetails = section.map((item, index) => {
    return (
      <>
        <div className="container-xxl" key={index}>
          <div className="questions-box mb-5">
            <h3 className="text-white">Edit Questions</h3>
            <div className="question-head">
              <HelpOutlineIcon /> <h5 className="mb-0 ms-1">Section Name</h5>
            </div>
            <div className="question-body">
              <ul className="mt-4 mb-4">
                {/* ==== one question/ans complete==== */}
                {getQuestions?.filter(
                  (item: any) => item?.template_id === tem_id
                ).length > 0 ? (
                  getQuestions
                    ?.filter((item: any) => item?.template_id === tem_id)
                    .map((item: any, i: Number, ques: any) => {
                      return (
                        <div key={item._id}>
                          <Stack
                            direction="row"
                            spacing={1}
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <IconButton
                              aria-label="delete"
                              onClick={() => updateTemplateQuestion(item)}
                              // onClick={(e) => {
                              //   console.log("test", item);
                              // }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              onClick={() => DeleteTemplateQuestion(item?._id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Stack>
                          <RenderQuestion
                            getQuestions={item.Question}
                            arr={ques}
                          />
                        </div>
                      );
                    })
                ) : (
                  <p style={{ textAlign: "center" }}>No Record Found</p>
                )}
              </ul>
            </div>
          </div>
          <QuestionBar />
          <EditQuestionBar />
        </div>
      </>
    );
  });

  return (
    <div>
      <div>{SectionDetails}</div>
    </div>
  );
};

export default EditTemplateQuestion;
