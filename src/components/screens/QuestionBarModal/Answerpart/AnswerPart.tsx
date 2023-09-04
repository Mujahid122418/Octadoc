import React, { useEffect } from "react";
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
  addQuestionModelFun,
} from "../../../../redux/TemplateQuestion/TemplateQuestion";
import { toast } from "react-toastify";
import {
  addQuestionFunAPI,
  getQuestion,
  updateAnswerFunAPI,
  addAnswerFunAPI,
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
  setQuestionType: (value: any) => void;
  setNewQuestion: (value: any) => void;
  newQuestion: string;
  qna: any;
  setQna: (value: any) => void;
  // UpdateQuestionsArray: (value: any) => void;
  QuestionType: any;
}
interface FollowUpQuestion {
  question: string;
  answer: string;
  Qindex: string;
  followup: FollowUpQuestion[];
  QuestionType: string;
}
interface QNAItem {
  question: string;
  answer: string;
  Qindex?: string;
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
      Qindex: createUUID(),
      followUp: [],
      QuestionType: "",
    });
    onUpdate(updatedQna);
  };

  const handelDelete = (e: any) => {
    const updatedQna = [...qna];
    let filter = updatedQna.filter((item) => item.index !== e);
    onUpdate(filter);
    console.log("delete", filter);
  };
  const onChangeQuestion = async (text: any, key: any) => {
    onUpdate(
      qna.map((item: any) => {
        return item.Qindex === key ? { ...item, question: text } : item;
      })
    );
  };

  const onChangeQuestionType = async (text: any, key: any) => {
    onUpdate(
      qna.map((item: any) => {
        return item.Qindex === key ? { ...item, QuestionType: text } : item;
      })
    );
  };
  return (
    <div>
      {qna.map((item: any, questionIndex: any) => (
        <div key={item.index} className="input-cover" style={{ padding: 10 }}>
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
              onChange={(e) => onChangeQuestion(e.target.value, item.Qindex)}
            />
          </div>

          <div className="selectt-box mt-3">
            <label htmlFor="">Type*</label>
            <select
              className="form-select mt-1"
              value={item.QuestionType}
              onChange={(e) =>
                onChangeQuestionType(e.target.value, item.Qindex)
              }
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
            <label htmlFor=""> Answer*</label>
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
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
  setQuestionType,
  setNewQuestion,
  newQuestion,
  qna,
  setQna,

  // UpdateQuestionsArray,

  QuestionType,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    addQuestionFollowupModel,
    isLoading,
    addQuestionModel,
    EditAnswer,
    EditSelectedQuestion,
  } = useSelector((state: RootState) => state?.templateQuestion);

  useEffect(() => {
    // let data =
    //   EditSelectedQuestion.length > 0 ? EditSelectedQuestion[0].Question : [];
    // console.log("data edit", data);
    setQna(EditSelectedQuestion);

    // if (data.length > 0) {

    // EditSelectedQuestion.map((item: any) => {
    //   newData.push({
    //     question: item.question,
    //     answer: item.answer,
    //     QuestionType: item.QuestionType,
    //     followUp: item.followUp,
    //     Qindex: item.Qindex,
    //   });
    // });
    //  }

    // setQna(newData);
  }, [EditSelectedQuestion]);

  // handel answer state start
  let template_id =
    window.location.href.split("/questions/edit/")[1] ||
    window.location.href.split("/questions/")[1];
  // handel answer state end
  const handleClickBtnSaveAnswer = (event: any, e1: string) => {
    event.preventDefault();

    if (!newAnswer) {
      toast.error("Answer is required");
    } else {
      let data = {
        template_id: template_id,
        question: newQuestion,
        answer: newAnswer,
        question_type: QuestionType,
      };

      console.log("save ans", data);
      dispatch(addQuestionFunAPI(data))
        .unwrap()
        .then((response) => {
          console.log("res", response.data);

          let data1 = {
            template_id: template_id,
            question: newQuestion,
            answer: newAnswer,
            question_type: QuestionType,
            follow_up_question_group_id: "",
            question_id: "",
          };
          console.log("res  dat1 1", data);

          // dispatch(addAnswerFunAPI(data1))
          // dispatch(getQuestion(d1));
        })
        .catch((error) => {
          toast.error(error);
        });
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

  // update answer
  useEffect(() => {
    if (Object.keys(EditAnswer).length > 0) {
      setNewAnswer(EditAnswer?.ans);
    }
  }, [EditAnswer]);

  const SaveFollowupQuestions = () => {
    let data = {
      template_id: template_id,
      question: newQuestion,
      answer: newAnswer,
      question_type: QuestionType,
    };

    console.log("save ans", data);
    dispatch(addQuestionFunAPI(data))
      .unwrap()
      .then((response) => {
        let { _id } = response.data;
        let data1 = {
          template_id: template_id,
          question: newQuestion,
          answer: newAnswer,
          question_type: QuestionType,
          follow_up_question_group_id: _id,
          question_id: _id,
        };

        dispatch(addAnswerFunAPI(data1)).then(() => {
          let d1 = {
            page: 1,
            pageSize: 20,
          };
          dispatch(getQuestion(d1));
          setNewAnswer("");
          setNewQuestion("");
          setQuestionType("");
        });
        // dispatch(getQuestion(d1));
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const AddModelFollowUpBtn = () => {
    dispatch(addQuestionModelFun(!addQuestionModel));
    dispatch(addQuestionFollowupModelFun(!addQuestionFollowupModel));
  };
  const list = (anchor: Anchor) => (
    <Box sx={{ width: 600 }} role="presentation">
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
        <h2 className="mb-1">Add Answer to</h2>

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
            name={"  Save Answer"}
            onClick={(e) => {
              handleClickBtnSaveAnswer(e, "save");
            }}
          />
        </div>
        <div className="label-button mt-4">
          <label htmlFor="">Follow Up Question</label>

          <Button2
            name="Add Follow Up Question"
            onClick={() => {
              AddModelFollowUpBtn();
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
          {isLoading ? (
            <Button2
              name="Loading ..."
              onClick={() => console.log("loading...")}
              isLoading={isLoading}
            />
          ) : (
            <Button2
              name="Save Followup Questions "
              onClick={() => {
                SaveFollowupQuestions();
              }}
            />
          )}
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
          className: "responsive-sidebar",
        }}
      >
        {list(anchor)}
      </Drawer>
    </div>
  );
};
export default AnswerBar;
