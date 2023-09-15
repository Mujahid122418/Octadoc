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
  addQuestionModelFun,
  addQuestionFollowupModelFun,
  questionTypeFun,
  passQuestionFun,
  EditAnswerFun,
} from "../../../redux/TemplateQuestion/TemplateQuestion";
import Checkbox from "@mui/material/Checkbox";

import Button2 from "../Button2/Button2";
import AddIcon from "@mui/icons-material/Add";
import {
  addQuestionFunAPI,
  getQuestion,
} from "../../../redux/TemplateQuestion/TemplateQuestionAPI";
import { toast } from "react-toastify";
import AnswerBar from "./Answerpart/AnswerPart";

import { create_UUID } from "../../../utils/UUID";
import { customRadioStyle } from "./EditQuestionBar";

interface StateType {
  // Define your state properties here
  right: any; // Change 'any' to the appropriate type
}

type Anchor = "right";

export default function QuestionBar() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    addQuestionModel,
    questionType,
    addQuestionFollowupModel,
    EditSelectedQuestion,
    getSingleQuestion,
    isLoading,
    getQuestions,
  } = useSelector((state: RootState) => state?.templateQuestion);
  const { activeSection } = useSelector((state: RootState) => state?.section);

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
  useEffect(() => {
    let data = {
      page: 1,
      pageSize: 20,
    };
    dispatch(getQuestion(data));
  }, []);
  const [newQuestion, setNewQuestion] = useState<string>("");
  const [newAnswer, setNewAnswer] = useState<string>("");

  const [QuestionType, setQuestionType] = useState("");

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
    } else if (!questionType) {
      toast.error("Please Select Question type");
    } else if (
      questionType === "Single Choice" ||
      questionType === "Multiple Choice"
    ) {
      toast.error("The answer field is required.");
    } else if (!activeSection) {
      toast.error("Please Select Active Section.");
    } else {
      try {
        let data = {
          // name: newQuestion,
          question: newQuestion,
          // answer: newAnswer,
          template_id: template_id,
          section_id: activeSection,
          question_type: questionType,
          parent_id: "",
        };

        dispatch(addQuestionFunAPI(data))
          .unwrap()
          .then((response) => {
            // console.log("respoce", response);
            dispatch(getQuestion(data));
            dispatch(addQuestionFollowupModelFun(false));
            dispatch(addQuestionModelFun(false));

            setNewQuestion("");
          })
          .catch((error) => {
            toast.error(error);
          });
      } catch (error) {}
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
    dispatch(addQuestionFollowupModelFun(!addQuestionFollowupModel));
    dispatch(addQuestionModelFun(!addQuestionModel));
  };
  useEffect(() => {
    setState((state) => ({
      ...state,
      right: addQuestionModel,
    }));
  }, [addQuestionModel]);

  const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (event.target === event.currentTarget) {
      event.stopPropagation();
    }
  };
  // handel qdit question

  const EditAnsewer = (e: any) => {
    console.log("ans id", e);
    let ans = {
      id: e.ans_id,
      ans: e.text,
    };
    dispatch(EditAnswerFun(ans));
    dispatch(addQuestionFollowupModelFun(!addQuestionFollowupModel));
  };

  const list = (anchor: Anchor) => (
    <Box sx={{ width: 600 }} role="presentation">
      <IconButton
        sx={{ ml: "auto" }}
        onClick={() => dispatch(addQuestionModelFun(!addQuestionModel))}
      >
        <CloseIcon />
      </IconButton>
      <List className="p-3 qu-bar">
        <h2 className="mb-1">Add New Question</h2>
        <p>Section Name</p>
        <label htmlFor="">Question</label>
        <input
          type="text"
          placeholder="What do you want to ask? "
          // onClick={handleInputClick}
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
            value={questionType}
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
                name="Add "
                onClick={() => {
                  addQuestionFollowupBtn();
                  // UpdateQuestionsArray();
                }}
                icon={<AddIcon />}
              />
            </div>
            {/* <div
              style={{
                padding: 5,
                border: "1px black solid",
                marginTop: 5,
                borderRadius: 8,
              }}
            >
              {
                getQuestions?.length > 0
                  ? getQuestions.map((item: any) => {
                      return (
                        <div
                          style={{
                            borderRadius: 5,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            padding: 10,
                          }}
                        >
                          <div> {item?.question}</div>
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
                              // onClick={() => EditAnsewer(item)}
                              size="small"
                            >
                              <EditIcon sx={{ width: 15, height: 15 }} />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              size="small"
                              // onClick={() => DeleteTemplate(item?._id)}
                            >
                              <DeleteIcon sx={{ width: 15, height: 15 }} />
                            </IconButton>
                          </Stack>
                        </div>
                      );
                    })
                  : null
                // <textarea name="" id="" cols={30} rows={5} />
              }
            </div> */}
            <textarea name="" id="" cols={30} rows={5} />
          </div>
        ) : null}

        <div className="save-button mt-2">
          {isLoading ? (
            <Button2
              name="Loading ..."
              onClick={() => console.log("loading...")}
              isLoading={isLoading}
            />
          ) : (
            <Button2
              name="Save Question"
              onClick={handleClickSaveBtn}
              isLoading={isLoading}
            />
          )}
        </div>
        <div className="close-button mt-2">
          <Button2
            name="Close"
            onClick={() => dispatch(addQuestionModelFun(!addQuestionModel))}
          />
        </div>
      </List>
    </Box>
  );

  const anchor: Anchor = "right";

  return (
    <div>
      <Drawer anchor={anchor} open={state[anchor]}>
        {list(anchor)}
      </Drawer>
      <AnswerBar
        newAnswer={newAnswer}
        setNewAnswer={setNewAnswer}
        setQuestionType={setQuestionType}
        setNewQuestion={setNewQuestion}
        newQuestion={newQuestion}
        qna={qna}
        setQna={setQna}
        // UpdateQuestionsArray={UpdateQuestionsArray}
        QuestionType={questionType}
      />
    </div>
  );
}
