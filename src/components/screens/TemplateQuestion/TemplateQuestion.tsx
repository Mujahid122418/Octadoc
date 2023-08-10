import React from "react";
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

import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import QuestionBar from '../QuestionBar/QuestionBar'

const TemplateQuestion = () => {

  const customRadioStyle = {
    color: '#6049cd', // Your custom color code
  };



  const handleClickBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className="container-xxl">
        <div className="questions-box mb-5">
          <h3 className="text-white">Questions</h3>
          <div className="question-head">
            <HelpOutlineIcon /> <h5 className="mb-0 ms-1">Section Name</h5>
          </div>
          <div className="question-body">
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

                <FormControl >
                  <RadioGroup
                    row
                    aria-labelledby="demo-form-control-label-placement"
                    name="position"
                    defaultValue="top"
                    sx={{border:'1px solid #6049cd' , borderRadius:'20px' , marginLeft:'20px'}}
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
              <li><ArrowForwardIosRoundedIcon /> Question No 3..</li>
              <div className="answer mt-3 mb-2 ms-3">
                <div className="first">
                  <input type="text" placeholder="Free Text" />
                </div>
              </div>
              
          {/* ==== 4nd question/ans complete endd==== */}
          <li><ArrowForwardIosRoundedIcon /> Question No 4..</li>
              <div className="answer mt-3 mb-2 ms-3">
                <div className="first w-100" >
                  <div className="aa">
                  <div className="bandg">sdadsfsdfs</div> 
                  <div className="bandg">sddfsdsfsdfsafdas</div> 
                  <div className="bandg">sddfdsfdssafdas</div> 
                  <div className="bandg" >sddfsas</div> 
                  <div className="bandg" >sddfsas</div> 
                  <div className="bandg" >sddfsas</div> 
                  <div className="bandg" >sddfsas</div> 
                  <div className="bandg" >sddfsas</div> 
                  <div className="bandg" >sddfsas</div> 
                  <div className="bandg" >sddfsas</div>
                  <div className="bandg" >sddfsas</div>
                  <div className="bandg" >sddfsas</div>
                  </div>
                </div>
              </div>

            <li><ArrowForwardIosRoundedIcon /> Question No 5..</li>
              <div className="answer mt-3 mb-2 ms-3">
                <div className="first w-100" >
                <FormGroup className="ms-3">
                <FormControlLabel control={<Checkbox defaultChecked  style={customRadioStyle} />} label="Label" />
                <FormControlLabel control={<Checkbox defaultChecked  style={customRadioStyle} />} label="Label" />
                <FormControlLabel control={<Checkbox defaultChecked  style={customRadioStyle} />} label="Label" />
                </FormGroup>
                </div>
              </div>

    
            </ul>
          </div>
          <div className="question-footer">
            <Button2
              name="Add Question"
              onClick={handleClickBtn}
              icon={<HelpCenterIcon />}
            />
            
            <Button2
              name="Add Section"
              onClick={handleClickBtn}
              icon={<HighlightAltIcon />}
            />

            <QuestionBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateQuestion;