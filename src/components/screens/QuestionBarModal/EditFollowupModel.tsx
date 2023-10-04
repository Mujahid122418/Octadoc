import { useEffect, useState } from "react";
import "./QuestionBar.css";

import Button2 from "../Button2/Button2";

import type { RootState } from "../../../redux/Store";

import List from "@mui/material/List";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/Store";

import {
  getQuestion,
  getAnswers,
  DeleteQuestion,
  UpdateQuestionFunAPI,
  getSingleQuestionFun,
} from "../../../redux/TemplateQuestion/TemplateQuestionAPI";

import Box from "@mui/material/Box";

import {
  IconButton,
  Tooltip,
  Modal,
  CircularProgress,
  Button,
} from "@mui/material";

// ===== tabs =====

interface IFollowupBar {
  editFollowUpModel: boolean;
  setEditFollowUpModel: (value: any) => void;
  editFollowUp: any;
}
// =====tabs end ====

const EditFollowupModel: React.FC<IFollowupBar> = ({
  editFollowUpModel,
  setEditFollowUpModel,
  editFollowUp,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [newQuestion, setNewQuestion] = useState<string>("");
  const [newAnswer, setNewAnswer] = useState<string>("");

  const [QuestionType, setQuestionType] = useState("");
  // model state start

  const handleClose = () => {
    setEditFollowUpModel(false);
  };

  useEffect(() => {
    if (editFollowUp) {
      setNewQuestion(editFollowUp?.question);
      setQuestionType(editFollowUp?.questionType);
      setNewAnswer(editFollowUp?.answer);
    }
  }, [editFollowUp]);
  // model state end

  const {
    section: sectionData,
    activeSection,
    isLoading: isLoadingSecton,
  } = useSelector((state: RootState) => state?.section);
  const { parent_id, EditSelectedQuestion } = useSelector(
    (state: RootState) => state?.templateQuestion
  );
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

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const HandelUpdate = () => {
    let data = {
      id: parent_id,
      followUpId: editFollowUp?._id,
      question: newQuestion,
      answer: [newAnswer],
      questionType: QuestionType,
    };
    console.log("data update", data);

    dispatch(UpdateQuestionFunAPI(data)).then(() => {
      let data = {
        page: 1,
        pageSize: 20,
      };
      let data1 = {
        id: EditSelectedQuestion?._id,
        page: 1,
        pageSize: 20,
      };
      console.log("data 1", data1);

      dispatch(getSingleQuestionFun(data1));
      dispatch(getQuestion(data));
      setEditFollowUpModel(false);
      // window.location.reload();
    });
  };

  // let test = sectionData.some((item) => item._id !== activeTab);
  // console.log("test", test);

  return (
    <div>
      <Modal
        open={editFollowUpModel}
        // onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }}>
          <h2 id="parent-modal-title">Edit Followup question</h2>
          <List className="p-3 qu-bar">
            <div>
              <label htmlFor="">Question</label>
              <input
                // disabled
                type="text"
                placeholder="What do you want to ask? "
                // onClick={handleInputClick}
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="">Answer</label>
              <input
                type="text"
                placeholder="Add Your Answer"
                // onClick={handleInputClick}
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label htmlFor="">Type*</label>
              <select
                className="form-select mt-1"
                value={QuestionType}
                onChange={(e) => {
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
          </List>
          <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            {isLoadingSecton ? (
              <CircularProgress
                color="inherit"
                size={20}
                sx={{ mr: 2, mt: 1 }}
              />
            ) : (
              <Button2 name="Update" onClick={() => HandelUpdate()} />
            )}
            <Button2 name="Cancel" onClick={handleClose} />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default EditFollowupModel;
