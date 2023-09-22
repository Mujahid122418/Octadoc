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
  ParentId_Fun,
  editQuestionFollowupModelFun,
  editQuestionModelFun,
} from "../../../../redux/TemplateQuestion/TemplateQuestion";
import { toast } from "react-toastify";
import {
  addAnswerFunAPI,
  addQuestionFunAPI,
  getAnswers,
  getQuestion,
  updateAnswerFunAPI,
  UpdateQuestionFunAPI,
} from "../../../../redux/TemplateQuestion/TemplateQuestionAPI";

import { create_UUID } from "../../../../utils/UUID";
import { customRadioStyle } from "../EditQuestionBar";

interface StateType {
  // Define your state properties here
  right: any; // Change 'any' to the appropriate type
}

type Anchor = "right";
interface IAnswerBar {
  newAnswer: string;
  setNewAnswer: (value: any) => void;
  newQuestion: string;
  setNewQuestion: (value: any) => void;
  qna: any;
  setQna: (value: any) => void;

  UpdateQuestionsArray: (value: any) => void;
  QuestionType: any;
}

const EditAnswerBar: React.FC<IAnswerBar> = ({
  newAnswer,
  setNewAnswer,
  newQuestion,
  setNewQuestion,
  qna,
  setQna,
  UpdateQuestionsArray,
  QuestionType,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    editQuestionFollowupModel,

    editQuestionModel,
    EditAnswer,
    EditSelectedQuestion,
    parent_id,
    getSingleQuestion,
  } = useSelector((state: RootState) => state?.templateQuestion);
  // console.log("EditSelectedQuestion", EditSelectedQuestion);
  const { activeSection } = useSelector((state: RootState) => state?.section);
  useEffect(() => {
    setQna(EditSelectedQuestion);
  }, [EditSelectedQuestion]);

  // handel answer state start
  let template_id =
    window.location.href.split("/questions/edit/")[1] ||
    window.location.href.split("/questions/")[1];
  // handel answer state end
  const SaveFollowupQuestions = (event: any, e1: string) => {
    event.preventDefault();

    let data = {
      question: newQuestion,
      answer: ["oy ja kam kr", newAnswer],
      template_id: template_id,
      section_id: activeSection,
      questionType: QuestionType,
      parentId: parent_id,
    };
    console.log(data, "data---->");
    dispatch(addQuestionFunAPI(data)).then(() => {
      let d1 = {
        page: 1,
        pageSize: 20,
      };
      dispatch(getQuestion(d1));
      //   dispatch(editQuestionModelFun(!editQuestionModel));
      //   let data = {
      //     page: 1,
      //     pageSize: 20,
      //   };
      //   dispatch(getAnswers(data));
      // });

      // dispatch(UpdateQuestionFunAPI(data))
      //   .unwrap()
      //   .then((response) => {
      //     let { _id } = response.data;
      //     localStorage.setItem("last_question_id", _id);
      //     let data1 = {
      //       id: EditSelectedQuestion?.answerD?.ans_id,
      //       template_id: template_id,
      //       question: newQuestion,
      //       answer: newAnswer,
      //       question_type: QuestionType,
      //       follow_up_question_group_id: _id,
      //       question_id: _id,
      //     };

      //     dispatch(updateAnswerFunAPI(data1)).then(() => {
      //       let d1 = {
      //         page: 1,
      //         pageSize: 20,
      //       };
      //       dispatch(getQuestion(d1));
      //       // setNewAnswer("");
      //       // setNewQuestion("");
      //       // setQuestionType("");
      //       // dispatch(questionTypeFun(""));
      //     });
      //     // dispatch(getQuestion(d1));
      //   })
      //   .catch((error) => {
      //     toast.error(error);
    });
  };

  const [state, setState] = React.useState<StateType>({
    right: false,
  });

  useEffect(() => {
    setState((state) => ({
      ...state,
      right: editQuestionFollowupModel,
    }));
  }, [editQuestionFollowupModel]);

  // update answer
  useEffect(() => {
    if (Object.keys(EditAnswer).length > 0) {
      setNewAnswer(EditAnswer?.ans);
    }
  }, [EditAnswer]);
  const addFollowUpQuestion = () => {
    setNewAnswer("");
    setNewQuestion("");

    dispatch(editQuestionModelFun(!editQuestionModel));
    dispatch(editQuestionFollowupModelFun(!editQuestionFollowupModel));
    dispatch(ParentId_Fun(getSingleQuestion._id));

    // let data = {
    //   parent_id: getSingleQuestion._id,
    // };
    // console.log("call", getSingleQuestion);
  };

  console.log(parent_id, "parent_id");

  const list = (anchor: Anchor) => (
    <Box sx={{ width: 550 }} role="presentation">
      <IconButton
        sx={{ ml: "auto" }}
        onClick={() => {
          dispatch(editQuestionModelFun(!editQuestionModel));
          dispatch(editQuestionFollowupModelFun(!editQuestionFollowupModel));
        }}
      >
        <CloseIcon />
      </IconButton>
      <List className="p-3 qu-bar">
        <h2 className="mb-1">Edit Answer to</h2>
        <label htmlFor="">Answer</label>
        <input
          type="text"
          placeholder="Add Your Answer"
          // onClick={handleInputClick}
          // value={newAnswer}
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
                value={newAnswer ? newAnswer : "add Out Put Text"}
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
            name={"Update Answer"}
            onClick={(e) => {
              SaveFollowupQuestions(e, "save");
            }}
          />
        </div>
        <div className="label-button mt-4">
          <label htmlFor="">Follow Up Question</label>

          <Button2
            name="+ Add Follow Up Question"
            onClick={() => {
              addFollowUpQuestion();
              // addQuestionFollowupBtn();
              // UpdateQuestionsArray("answer");
            }}
            icon={<AddIcon />}
          />
        </div>
        <textarea name="" id="" cols={30} rows={5} />
        <div className="save-button mt-2">
          <Button2
            name="Update Followup Questions"
            onClick={(e) => {
              SaveFollowupQuestions(e, "save");
            }}
          />
        </div>
        <div className="close-button mt-2">
          <Button2
            name="Close"
            onClick={() => {
              dispatch(editQuestionModelFun(!editQuestionModel));
              dispatch(
                editQuestionFollowupModelFun(!editQuestionFollowupModel)
              );
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
export default EditAnswerBar;
