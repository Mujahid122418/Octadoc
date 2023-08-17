import React, { useState } from "react";
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
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import QuestionBar from "../QuestionBar/QuestionBar";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/Store";
import { addQuestionModelFun } from "../../../redux/TemplateQuestion/TemplateQuestion";
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from "@mui/icons-material/PostAdd";
import IconButton from "@mui/material/IconButton";
import AnswerBar from "../QuestionBar/Answerpart/AnswerPart";

const TemplateQuestion = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [section, setSection] = useState([1]);
  const { addQuestionModel, addQuestionFollowupModel, isLoading } = useSelector(
    (state: RootState) => state?.templateQuestion
  );
  console.log("models", addQuestionModel, addQuestionFollowupModel);

  const customRadioStyle = {
    color: "#6049cd", // Your custom color code
  };

  const AddQuestionModel = () => {
    try {
      dispatch(addQuestionModelFun(true));
    } catch (error) {}
  };
  const AddSection = async (e: any) => {
    console.log("ee", e);

    setSection((current) => [...current, ++e]);
  };
  const DeleteSection = (e: any) => {
    let filter = section.filter((item) => item !== e);

    setSection(filter);
  };
  const SectionDetails = section.map((item, index) => {
    const actionButton =
      index === 0 ? (
        <IconButton aria-label="delete" onClick={() => AddSection(item)}>
          <PostAddIcon />
        </IconButton>
      ) : (
        <IconButton
          aria-label="delete"
          // color="danger"
          onClick={() => DeleteSection(item)}
        >
          <DeleteIcon />
        </IconButton>
      );
    return (
      <>
        <div className="container-xxl">
          <div className="questions-box mb-5">
            <h3 className="text-white">Questions</h3>
            <div className="question-head">
              <HelpOutlineIcon /> <h5 className="mb-0 ms-1">Section Name</h5>
            </div>

            <div className="question-body">
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {actionButton}
              </div>
              <ul className="mt-4 mb-4">
                {/* ==== one question/ans complete==== */}
                <li>
                  <ArrowForwardIosRoundedIcon /> Question no 1..
                </li>
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

                {/* ==== 2nd question/ans complete endd==== */}
                <li>
                  <ArrowForwardIosRoundedIcon /> Question No 2..
                </li>
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

                {/* ==== 3nd question/ans complete endd==== */}
                <li>
                  <ArrowForwardIosRoundedIcon /> Question No 3..
                </li>
                <div className="answer mt-3 mb-2 ms-3">
                  <div className="first">
                    <input type="text" placeholder="Free Text" />
                  </div>
                </div>

                {/* ==== 4nd question/ans complete endd==== */}
                <li>
                  <ArrowForwardIosRoundedIcon /> Question No 4..
                </li>
                <div className="answer mt-3 mb-2 ms-3">
                  <div className="first w-100">
                    <div className="aa">
                      <div className="bandg">sdadsfsdfs</div>
                      <div className="bandg">sddfsdsfsdfsafdas</div>
                      <div className="bandg">sddfdsfdssafdas</div>
                      <div className="bandg">sddfsas</div>
                      <div className="bandg">sddfsas</div>
                      <div className="bandg">sddfsas</div>
                      <div className="bandg">sddfsas</div>
                      <div className="bandg">sddfsas</div>
                      <div className="bandg">sddfsas</div>
                      <div className="bandg">sddfsas</div>
                      <div className="bandg">sddfsas</div>
                      <div className="bandg">sddfsas</div>
                    </div>
                  </div>
                </div>

                <li>
                  <ArrowForwardIosRoundedIcon /> Question No 5..
                </li>
                <div className="answer mt-3 mb-2 ms-3">
                  <div className="first w-100">
                    <FormGroup className="ms-3">
                      <FormControlLabel
                        control={
                          <Checkbox defaultChecked style={customRadioStyle} />
                        }
                        label="Label"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox defaultChecked style={customRadioStyle} />
                        }
                        label="Label"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox defaultChecked style={customRadioStyle} />
                        }
                        label="Label"
                      />
                    </FormGroup>
                  </div>
                </div>
              </ul>
            </div>
            <div className="question-footer">
              <Button2
                name="Add Question"
                onClick={AddQuestionModel}
                icon={<HelpCenterIcon />}
              />

              <Button2
                name="Add Section"
                onClick={() => AddSection(item)}
                icon={<HighlightAltIcon />}
              />

              <QuestionBar />
              <AnswerBar />
            </div>
          </div>
        </div>
      </>
    );
  });

  return <div>{SectionDetails}</div>;
};

export default TemplateQuestion;
