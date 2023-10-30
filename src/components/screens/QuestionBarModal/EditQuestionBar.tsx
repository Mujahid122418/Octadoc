import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import CloseIcon from "@mui/icons-material/Close";
import "./QuestionBar.css";
import FormControlLabel from "@mui/material/FormControlLabel";

import type { RootState } from "../../../redux/Store";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/Store";

import {
  editQuestionModelFun,
  editQuestionFollowupModelFun,
  questionTypeFun,
  passQuestionFun,
  EditAnswerFun,
} from "../../../redux/TemplateQuestion/TemplateQuestion";
import Checkbox from "@mui/material/Checkbox";

import Button2 from "../Button2/Button2";
import AddIcon from "@mui/icons-material/Add";
import {
  addQuestionFunAPI,
  DeleteAnswer,
  DeleteQuestion,
  getAnswers,
  getQuestion,
  getSingleQuestionFun,
  UpdateQuestionFunAPI,
} from "../../../redux/TemplateQuestion/TemplateQuestionAPI";
import { toast } from "react-toastify";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import { create_UUID } from "../../../utils/UUID";
import EditAnswerBar from "./Answerpart/EditAnswerbar";
import EditFollowupModel from "./EditFollowupModel";

interface StateType {
  // Define your state properties here
  right: any; // Change 'any' to the appropriate type
}
export const customRadioStyle = {
  color: "#6049cd", // Your custom color code
};
type Anchor = "right";

export default function EditQuestionBar() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    editQuestionModel,
    editQuestionFollowupModel,
    questionType,

    EditSelectedQuestion,
    getSingleQuestion,
    isLoading,
    getQuestions,
    getAnswer,
    parent_id,
  } = useSelector((state: RootState) => state?.templateQuestion);

  const createUUID = (): string => {
    return create_UUID();
  };

  // handel states start
  const [qna, setQna] = useState<any>([
    {
      question: "",
      answer: "",
      Qindex: createUUID(),
      QuestionType: "",
      followUp: [],
    },
  ]);

  const [newQuestion, setNewQuestion] = useState<string>("");
  const [newAnswer, setNewAnswer] = useState<string>("");

  const [QuestionType, setQuestionType] = useState("");
  const [tip, setTip] = useState("");
  // ===collpase====
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClickSaveBtn = () => {
    let template_id =
      window.location.href.split("/questions/edit/")[1] ||
      window.location.href.split("/questions/")[1];
    if (!newQuestion) {
      toast.error("Please enter Question");
    } else {
      try {
        let data = {
          id: EditSelectedQuestion?._id,
          question: newQuestion,
          template_id: template_id,
          questionType: QuestionType,
          answer: EditSelectedQuestion?.answer,

          // answer: [newAnswer],

          // section_id: activeSection,

          parentId: parent_id,
          tip,
        };
        console.log("update question", data);

        dispatch(UpdateQuestionFunAPI(data))
          .unwrap()
          .then((response) => {
            let d = {
              page: 1,
              pageSize: 20,
            };
            dispatch(getQuestion(d));
          })
          .catch((error) => {
            toast.error(error);
          });
      } catch (error) {
        console.log("err", error);
      }
    }
  };

  // ===collpase end====

  const [state, setState] = React.useState<StateType>({
    right: false,
  });
  const addQuestionFollowupBtn = () => {
    let pass = {
      name: newQuestion,
      template_id: window.location.href.split("/questions/")[1],
      question_type: questionType,
    };

    dispatch(passQuestionFun(pass));
    dispatch(editQuestionFollowupModelFun(!editQuestionFollowupModel));
    dispatch(editQuestionModelFun(!editQuestionModel));
  };

  useEffect(() => {
    setState((state) => ({
      ...state,
      right: editQuestionModel,
    }));
  }, [editQuestionModel]);

  const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (event.target === event.currentTarget) {
      event.stopPropagation();
    }
  };

  // handel qdit question

  useEffect(() => {
    if (Object.keys(EditSelectedQuestion)?.length > 0) {
      let data = {
        id: EditSelectedQuestion?._id,
        page: 1,
        pageSize: 20,
      };

      dispatch(getSingleQuestionFun(data));
    }
  }, [EditSelectedQuestion]);

  useEffect(() => {
    if (getSingleQuestion) {
      setNewQuestion(getSingleQuestion?.question);
      setQuestionType(getSingleQuestion?.questionType);
      setNewAnswer(getSingleQuestion?.answer);
      setTip(getSingleQuestion?.tip);
    }
  }, [getSingleQuestion]);
  // get all answers start
  useEffect(() => {
    let data = {
      page: 1,
      pageSize: 20,
    };
    dispatch(getAnswers(data));
  }, []);
  // get all answers end

  const DeleteAns = async (e: any, parent_id: any) => {
    try {
      console.log("item id", e, parent_id);
      let data = {
        questionId: parent_id,
        followUpId: e,
      };
      console.log("data", data);

      dispatch(DeleteQuestion(data))
        .unwrap()
        .then((res) => {
          let data = {
            page: 1,
            pageSize: 20,
          };
          let data1 = {
            id: EditSelectedQuestion?._id,
            page: 1,
            pageSize: 20,
          };

          dispatch(getSingleQuestionFun(data1));
          dispatch(getQuestion(data));
        })
        .catch((e) => {
          console.log("delete question", e);
        });
    } catch (error) {}
  };

  // edit states of followup question start
  const [editFollowUpModel, setEditFollowUpModel] = useState(false);
  const [editFollowUp, setEditFollowUp] = useState({});

  const EditFollowupAns = async (e: any, parent_id: any) => {
    try {
      setEditFollowUpModel(true);
      setEditFollowUp(e);
    } catch (error) {
      console.log("EditFollowupAns err", error);
    }
  };
  // edit states of followup question end
  const list = (anchor: Anchor) => (
    <Box sx={{ width: 550 }} role="presentation">
      <IconButton
        sx={{ ml: "auto" }}
        onClick={() => dispatch(editQuestionModelFun(!editQuestionModel))}
      >
        <CloseIcon />
      </IconButton>
      <List className="p-3 qu-bar">
        <h2 className="mb-1">Edit Question </h2>
        <p>Section Name</p>
        <label htmlFor="">Question</label>
        <input
          // disabled
          type="text"
          placeholder="What do you want to ask?"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <FormControlLabel
          className="ms-1"
          control={<Checkbox defaultChecked style={customRadioStyle} />}
          label="Hide this from your clinical notes"
        />
        {/* ===collpase==== */}
        <div>
          <h5 className="coll" onClick={handleExpandClick}>
            Tip
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </h5>
          <Collapse in={expanded}>
            <div>
              <div className="coll-body">
                <div className="coll-band">
                  <p className="mb-0">
                    The info symbol appears next to the question to help you
                    recall any significant information regarding that question.
                  </p>
                </div>
                <input
                  value={tip}
                  onChange={(e) => setTip(e.target.value)}
                  className="mt-2 ms-0"
                  type="text"
                  placeholder="Question Help text"
                />
              </div>
            </div>
          </Collapse>
        </div>
        {/* ===collpase==== */}
        <div className="selectt-box mt-3">
          <label htmlFor="">Type*</label>
          <select
            className="form-select mt-1"
            value={QuestionType}
            onChange={(e) => {
              dispatch(questionTypeFun(e.target.value));
              setQuestionType(e.target.value);
            }}
          >
            <option>Select</option>
            <option>Date Time</option>
            <option>Dosage</option>
            <option>Free Text</option>
            <option>Multiple Choice</option>
            <option>Single Choice</option>
          </select>
        </div>
        <input
          disabled
          type="text"
          className="mt-2 ms-0"
          placeholder="What do you want to ask?"
          onClick={handleInputClick}
        />
        <FormControlLabel
          className="ms-1"
          control={<Checkbox defaultChecked style={customRadioStyle} />}
          label="Hide this from your clinical notes"
        />
        {questionType === "Multiple Choice" ||
        QuestionType === "Multiple Choice" ||
        questionType === "Single Choice" ||
        QuestionType === "Single Choice" ? (
          <div>
            <div className="label-button">
              <label htmlFor="">Answer </label>
              <Button2
                name="Add Answer"
                onClick={() => {
                  addQuestionFollowupBtn();
                }}
                icon={<AddIcon />}
              />
            </div>
            <div
              style={{
                // padding: 5,
                // border: "1px black solid",
                marginTop: 5,
                borderRadius: 8,
              }}
            >
              {Object.keys(getSingleQuestion)?.length ? (
                // getSingleQuestion
                //   .filter((item: any) => item._id === parent_id)
                getSingleQuestion.followUp.map((item: any, i: any) => {
                  return (
                    <div
                      style={{
                        borderRadius: 5,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 10,
                        borderBottom: "0.25px solid rgb(211, 211, 211)",
                      }}
                    >
                      <div>
                        <div>
                          Q {++i} :- {item.question}
                          {/* <input
                            type="text"
                            value={item.question}
                            onChange={(e) =>
                              console.log("edit ques", e.target.value)
                            }
                          /> */}
                        </div>
                        <div>A: {item?.answer}</div>
                      </div>
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
                          onClick={() => EditFollowupAns(item, parent_id)}
                          size="small"
                        >
                          <EditIcon sx={{ width: 15, height: 15 }} />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          size="small"
                          onClick={() => DeleteAns(item?._id, parent_id)}
                        >
                          <DeleteIcon sx={{ width: 15, height: 15 }} />
                        </IconButton>
                      </Stack>
                    </div>
                  );
                })
              ) : (
                <textarea name="" id="" cols={30} rows={5} />
              )}
            </div>
            {/* <textarea name="" id="" cols={30} rows={5} /> */}
          </div>
        ) : null}
        {/* test value  start */}

        {/* test value end  */}
        <div className="save-button mt-2">
          <Button2 name="Update Question" onClick={handleClickSaveBtn} />
        </div>
        <div className="close-button mt-2">
          <Button2
            name="Close"
            onClick={() => dispatch(editQuestionModelFun(!editQuestionModel))}
          />
        </div>
      </List>
    </Box>
  );

  const anchor: Anchor = "right";

  return (
    <div>
      <EditFollowupModel
        editFollowUpModel={editFollowUpModel}
        setEditFollowUpModel={setEditFollowUpModel}
        editFollowUp={editFollowUp}
      />
      <Drawer anchor={anchor} open={state[anchor]}>
        {list(anchor)}
      </Drawer>

      <EditAnswerBar
        newAnswer={newAnswer}
        setNewAnswer={setNewAnswer}
        newQuestion={newQuestion}
        setNewQuestion={setNewQuestion}
        qna={qna}
        setQna={setQna}
        QuestionType={QuestionType}
      />
    </div>
  );
}
