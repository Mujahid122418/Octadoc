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
  questionTypeFun,
} from "../../../../redux/TemplateQuestion/TemplateQuestion";
import { toast } from "react-toastify";
import {
  addQuestionFunAPI,
  getQuestion,
  updateAnswerFunAPI,
  addAnswerFunAPI,
  add_FollowUp_FunAPI,
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
  setQuestionType: (value: any) => void;
  setNewQuestion: (value: any) => void;
  newQuestion: string;
  qna: any;
  setQna: (value: any) => void;
  // UpdateQuestionsArray: (value: any) => void;
  QuestionType: any;
}

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
    parent_id,
  } = useSelector((state: RootState) => state?.templateQuestion);
  const { activeSection } = useSelector((state: RootState) => state?.section);

  useEffect(() => {
    // let data =
    //   EditSelectedQuestion?.length > 0 ? EditSelectedQuestion[0].Question : [];

    setQna(EditSelectedQuestion);

    // if (data?.length > 0) {

    // EditSelectedQuestion.map((item: any) => {
    //   newData.push({
    //     question: item.question,
    //     answer: item?.answer,
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

  const SaveFollowupQuestions = async () => {
    let data = {
      question: newQuestion,
      answer: newAnswer,
      template_id: template_id,
      section_id: activeSection,
      questionType: QuestionType,
      parentId: parent_id,
    };

    dispatch(addQuestionFunAPI(data)).then(() => {
      let d1 = {
        page: 1,
        pageSize: 20,
      };
      dispatch(getQuestion(d1));
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
          {isLoading ? (
            <Button2
              name="Loading ..."
              onClick={() => console.log("loading...")}
              isLoading={isLoading}
            />
          ) : (
            <Button2
              name={"Save Answer"}
              onClick={(e) => {
                SaveFollowupQuestions();
              }}
            />
          )}
        </div>
        {/* <div className="label-button mt-4">
          <label htmlFor="">Follow Up Question</label>
          <Button2
            name="Add Follow Up Question"
            onClick={() => {
              AddModelFollowUpBtn();
            }}
            icon={<AddIcon />}
          />
        </div> */}

        {/* <div className="save-button mt-2">
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
        </div> */}
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
