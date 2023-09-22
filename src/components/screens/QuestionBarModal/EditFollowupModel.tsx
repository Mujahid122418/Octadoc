import { useEffect, useState } from "react";
import "./QuestionBar.css";
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
import List from "@mui/material/List";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/Store";

import CancelIcon from "@mui/icons-material/Cancel";
import {
  getQuestion,
  getAnswers,
  DeleteQuestion,
  UpdateQuestionFunAPI,
} from "../../../redux/TemplateQuestion/TemplateQuestionAPI";
import { useNavigate } from "react-router-dom";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import {
  IconButton,
  Tooltip,
  Modal,
  CircularProgress,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteSection, getSection } from "../../../redux/Section/SectionAPI";

import { activeSectionFun } from "../../../redux/Section/SectionSlice";
import { toast } from "react-toastify";
import axios from "axios";

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
  const { parent_id } = useSelector(
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

    dispatch(UpdateQuestionFunAPI(data)).then(() => {
      let data = {
        page: 1,
        pageSize: 20,
      };
      dispatch(getQuestion(data));
      setEditFollowUpModel(false);
    });
  };

  // let test = sectionData.some((item) => item._id !== activeTab);
  // console.log("test", test);

  const EditFollow = async (edit: { _id: string }, parentId: string) => {
    console.log(edit?._id, "edit?._id", parentId, "----------------->");
    // let res = await axios.put(`http://localhost:5051/question/${id}`, {
    //   question: "what is your ages?",
    //   answer: ["hassan", "habib tahir"],
    //   // followUpId: edit?._id,
    // });
  };

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
                  //   dispatch(questionTypeFun(e.target.value));
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
