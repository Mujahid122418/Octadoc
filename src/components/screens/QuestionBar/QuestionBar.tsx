import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
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
} from "../../../redux/TemplateQuestion/TemplateQuestion";
import Checkbox from "@mui/material/Checkbox";

import Button2 from "../Button2/Button2";
import AddIcon from "@mui/icons-material/Add";

interface StateType {
  // Define your state properties here
  right: any; // Change 'any' to the appropriate type
}
const customRadioStyle = {
  color: "#6049cd", // Your custom color code
};

type Anchor = "right";

export default function QuestionBar() {
  // let url = window.location?.pathname.split("/questions/")[1];
  const dispatch = useDispatch<AppDispatch>();

  const { addQuestionModel, isLoading } = useSelector(
    (state: RootState) => state?.templateQuestion
  );

  // ===collpase====
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleClickBtn = () => {};
  // ===collpase end====

  const [state, setState] = React.useState<StateType>({
    right: false,
  });
  const addQuestionFollowupBtn = () => {
    dispatch(addQuestionFollowupModelFun(true));
    dispatch(addQuestionModelFun(false));
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

  const list = (anchor: Anchor) => (
    <Box sx={{ width: 550 }} role="presentation">
      <IconButton
        sx={{ ml: "auto" }}
        onClick={() => dispatch(addQuestionModelFun(false))}
      >
        <CloseIcon />
      </IconButton>
      <List className="p-3 qu-bar">
        <h2 className="mb-1">Add New Question</h2>
        <p>Section Name</p>
        <label htmlFor="">Question</label>
        <input
          type="text"
          placeholder="What do you want to ask?"
          onClick={handleInputClick}
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
          <select className="form-select mt-1">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
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

        <div className="label-button">
          <label htmlFor="">Answer</label>
          <Button2
            name="Add "
            onClick={() => addQuestionFollowupBtn()}
            icon={<AddIcon />}
          />
        </div>
        <textarea name="" id="" cols={30} rows={5} />
        <div className="save-button mt-2">
          <Button2 name="Save Question " onClick={handleClickBtn} />
        </div>
        <div className="close-button mt-2">
          <Button2 name="Close" onClick={handleClickBtn} />
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
    </div>
  );
}
