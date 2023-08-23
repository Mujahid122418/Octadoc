import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import CloseIcon from "@mui/icons-material/Close";

import DeleteIcon from "@mui/icons-material/Delete";
import "./AnswerBar.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { AppDispatch } from "../../../../redux/Store";

import type { RootState } from "../../../../redux/Store";
import AddIcon from "@mui/icons-material/Add";
import Button2 from "../../Button2/Button2";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuestionFollowupModelFun,
  addQuestionFun,
  addQuestionModelFun,
} from "../../../../redux/TemplateQuestion/TemplateQuestion";
import { toast } from "react-toastify";
import {
  addQuestionFunAPI,
  getQuestion,
  updateAnswerFunAPI,
} from "../../../../redux/TemplateQuestion/TemplateQuestionAPI";
import { create_UUID } from "../../../../utils/UUID";

interface StateType {
  // Define your state properties here
  right: any; // Change 'any' to the appropriate type
}
const customRadioStyle = {
  color: "#6049cd",
};

type Anchor = "right";
interface IAnswerBar {
  newAnswer: string;
  setNewAnswer: (value: any) => void;
  newQuestion: string;
  qna: any;
  setQna: (value: any) => void;
  newFollowUp: any;
  UpdateQuestionsArray: (value: any) => void;
  QuestionType: any;
}
interface FollowUpQuestion {
  question: string;
  answer: string;
  index: string;
  followup: FollowUpQuestion[];
  QuestionType: string;
}
interface QNAItem {
  question: string;
  answer: string;
  index: string;
  followUp: FollowUpQuestion[];
  QuestionType: string;
}

const QNAComponent: React.FC<{
  qna: any;
  onUpdate: (updatedQna: QNAItem[]) => void;
  // onDelete: (updatedQna: QNAItem[]) => void;
}> = ({ qna, onUpdate }) => {
  const createUUID = (): string => {
    return create_UUID();
  };

  const handleAddQuestion = () => {
    const updatedQna = [...qna];
    updatedQna.push({
      question: "",
      answer: "",
      index: createUUID(),
      followUp: [],
      QuestionType: "",
    });
    onUpdate(updatedQna);
  };

  const handelDelete = (e: any) => {
    console.log("ee", e);
    const updatedQna = [...qna];
    let filter = updatedQna.filter((item) => item.index != e);
    onUpdate(filter);
    // console.log("filter", filter);
    // console.log("delete", updatedQna);
  };
  return (
    <div>
      {qna.map((item: any, questionIndex: any) => (
        <div key={item.index} className="input-cover" style={{ padding: 10 }}>
          {/* {console.log("item", item)} */}
          {/* <button onClick={() => handelDelete(item.index)}>delete</button> */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              aria-label="delete"
              onClick={() => handelDelete(item.index)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
          <div>
            <label htmlFor="">Question*</label>
            <input
              type="text"
              value={item.question}
              className="question-input"
              placeholder="Question"
              onChange={(e) => {
                const value = e.target.value;
                const updatedQna = [...qna];
                updatedQna[questionIndex].question = value;
                onUpdate(updatedQna);
              }}
            />
          </div>

          <div className="selectt-box mt-3">
            <label htmlFor="">Type*</label>
            <select
              className="form-select mt-1"
              value={item.QuestionType}
              onChange={(e) => {
                const value = e.target.value;
                const updatedQna = [...qna];

                updatedQna[questionIndex].QuestionType = value;
                onUpdate(updatedQna);
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
          <div style={{ paddingTop: 20 }}>
            <label htmlFor="">Answer*</label>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                className="answer-input"
                value={item.answer}
                placeholder="Answer"
                onChange={(e) => {
                  const value = e.target.value;
                  const updatedQna = [...qna];
                  updatedQna[questionIndex].answer = value;
                  onUpdate(updatedQna);
                }}
              />
              {/* <IconButton aria-label="delete" onClick={handleAddQuestion}>
                <AddIcon />
              </IconButton> */}
            </div>
          </div>

          <QNAComponent
            qna={item.followUp}
            onUpdate={(updatedFollowUp) => {
              const updatedQna = [...qna];
              updatedQna[questionIndex].followUp = updatedFollowUp;
              onUpdate(updatedQna);
            }}
          />
        </div>
      ))}

      {qna.length > 0 ? (
        <Button2 name="Add Question" onClick={handleAddQuestion} />
      ) : (
        <div>
          <IconButton aria-label="delete" onClick={handleAddQuestion}>
            <AddIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

const AnswerBar: React.FC<IAnswerBar> = ({
  newAnswer,
  setNewAnswer,
  newQuestion,
  qna,
  setQna,
  newFollowUp,
  UpdateQuestionsArray,
  QuestionType,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    addQuestionFollowupModel,

    addQuestionModel,
    EditAnswer,
  } = useSelector((state: RootState) => state?.templateQuestion);

  // handel answer state start
  let template_id =
    window.location.href.split("/questions/edit/")[1] ||
    window.location.href.split("/questions/")[1];
  // handel answer state end
  const handleClickBtnSaveAnswer = (event: any, e1: string) => {
    event.preventDefault();

    console.log("updatedQna", template_id);

    if (!newAnswer) {
      toast.error("Answer is required");
    } else {
      let data = {
        question: newQuestion,
        answer: newAnswer,
        QuestionType: QuestionType,
        index: create_UUID(),
        followUp: [],
      };
      const updatedQna = [...qna];
      updatedQna.push(data);
      console.log("passQuestion", updatedQna);
      console.log("qna", qna);
      var saveMultiple = {
        template_id: template_id,
        // question_type: QuestionType,
        Question: updatedQna,
      };
      var saveSingle = {
        // question_type: QuestionType,
        question: newQuestion,
        answer: newAnswer,
      };
      if (
        QuestionType === "Multiple Choice" ||
        QuestionType === "Single Choice"
      ) {
        console.log("save ", saveMultiple);
        dispatch(addQuestionFunAPI(saveMultiple))
          .unwrap()
          .then((response) => {
            let d1 = {
              page: 1,
              pageSize: 20,
            };
            dispatch(getQuestion(d1));
          })
          .catch((error) => {
            toast.error(error);
          });
      } else {
        console.log("saveSingle ", saveSingle);
      }

      // dispatch(addQuestionFunAPI(save));

      // dispatch(addQuestionFunAPI(passQuestion))
      //   .unwrap()
      //   .then((res) => {
      //     let { _id, template_id } = res?.data;
      //     let data = {
      //       follow_up_question_group_id: _id,
      //       text: newAnswer,
      //       question_id: _id,
      //       template_id: template_id,
      //     };

      //     dispatch(addAnswerFunAPI(data))
      //       .unwrap()
      //       .then((response) => {
      //         let d1 = {
      //           page: 1,
      //           pageSize: 20,
      //         };
      //         dispatch(getQuestion(d1));
      //       })
      //       .catch((error) => {
      //         toast.error(error);
      //       });
      //   })
      //   .catch((e) => {
      //     console.log("err ans", e);
      //     toast.error("error", e);
      //   });
    }
  };

  const [state, setState] = React.useState<StateType>({
    right: false,
  });

  useEffect(() => {
    setState((state) => ({
      ...state,
      right: addQuestionFollowupModel,
    }));
  }, [addQuestionFollowupModel]);

  // const addQuestionFollowupBtn = () => {
  //   dispatch(addQuestionModelFun(!addQuestionModel));
  //   dispatch(addQuestionFollowupModelFun(!addQuestionFollowupModel));
  // };
  // update answer
  useEffect(() => {
    if (Object.keys(EditAnswer).length > 0) {
      setNewAnswer(EditAnswer?.ans);
    }
  }, [EditAnswer]);
  const updateAnswer = () => {
    try {
      let ans = { id: EditAnswer?.id, text: newAnswer };

      dispatch(updateAnswerFunAPI(ans))
        .unwrap()
        .then((response) => {
          let d1 = {
            page: 1,
            pageSize: 20,
          };
          dispatch(getQuestion(d1));
        })
        .catch((error) => {
          toast.error(error);
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  const SaveFollowupQuestions = () => {
    console.log("qna", qna);
    var save = {
      template_id: template_id,
      // question_type: QuestionType,
      Question: qna,
    };

    dispatch(addQuestionFunAPI(save))
      .unwrap()
      .then((response) => {
        let d1 = {
          page: 1,
          pageSize: 20,
        };
        dispatch(getQuestion(d1));
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const list = (anchor: Anchor) => (
    <Box sx={{ width: 550 }} role="presentation">
      <IconButton
        sx={{ ml: "auto" }}
        onClick={() => {
          dispatch(addQuestionModelFun(!addQuestionModel));
          dispatch(addQuestionFollowupModelFun(!addQuestionFollowupModel));
        }}
      >
        <CloseIcon />
      </IconButton>
      <List className="p-3 qu-bar">
        <h2 className="mb-1">
          {Object.keys(EditAnswer).length > 0
            ? "Edit Answer to"
            : "Add Answer to"}
        </h2>

        <label htmlFor="">Answer</label>
        <input
          type="text"
          placeholder="Add Your Answer"
          // onClick={handleInputClick}
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        />
        <FormControlLabel
          className="ms-1"
          control={<Checkbox defaultChecked style={customRadioStyle} />}
          label="Hide this from your clinical notes"
        />
        {/* ===collpase==== */}
        <div className="mt-3">
          <h6 className="coll">No Tip</h6>
          <div>
            <div className="coll-body">
              <div className="coll-band">
                <p className="mb-0">
                  Text that will appear in the patient notes
                </p>
              </div>
              <input
                value={newAnswer}
                disabled
                className="mt-2 ms-0"
                type="text"
                placeholder="add Out Put Text"
              />
            </div>
          </div>
        </div>
        {/* ===collpase==== */}
        <div className="save-button mt-2">
          <Button2
            name={
              Object.keys(EditAnswer).length > 0
                ? "Update Answer"
                : "Save Answer"
            }
            onClick={(e) => {
              Object.keys(EditAnswer).length > 0
                ? updateAnswer()
                : handleClickBtnSaveAnswer(e, "save");
            }}
          />
        </div>
        <div className="label-button mt-4">
          <label htmlFor="">Follow Up Question</label>

          <Button2
            name="+ Add Follow Up Question"
            onClick={() => {
              // addQuestionFollowupBtn();
              UpdateQuestionsArray("answer");
            }}
            icon={<AddIcon />}
          />
        </div>

        {qna.length > 0 ? (
          <QNAComponent qna={qna} onUpdate={setQna} />
        ) : (
          <textarea disabled name="" id="" cols={30} rows={5} />
        )}
        <div className="save-button mt-2">
          <Button2
            name="Save Followup Questions"
            onClick={() => {
              SaveFollowupQuestions();
            }}
          />
        </div>
        <div className="close-button mt-2">
          <Button2
            name="Close"
            onClick={() => {
              dispatch(addQuestionModelFun(!addQuestionModel));
              dispatch(addQuestionFollowupModelFun(!addQuestionFollowupModel));
            }}
          />
        </div>
      </List>
    </Box>
  );

  const anchor: Anchor = "right";

  return (
    <div>
      {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        PaperProps={{
          className: "responsive-sidebar", // Use the custom class for responsive behavior
          sx: {
            width: 550, // Set the width for larger screens
          },
        }}
      >
        {list(anchor)}
      </Drawer>
    </div>
  );
};
export default AnswerBar;
