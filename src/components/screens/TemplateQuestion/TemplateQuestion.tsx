import React from 'react';
import './TemplateQuestion.css';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Button2 from '../Button2/Button2';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';

const TemplateQuestion = () => {
  const handleClickBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className="container-xxl">
        <div className="questions-box">
          <h3 className='text-white'>Questions</h3>
          <div className="question-head">
            <HelpOutlineIcon/> <h5 className='mb-0 ms-1'>Section Name</h5>
          </div>
          <div className="question-body">
            {/* ... */}
          </div>
          <div className="question-footer">
            <Button2 name='Add Question' onClick={handleClickBtn} icon={<HelpCenterIcon />} />
            <Button2 name='Add Section' onClick={handleClickBtn} icon={<HighlightAltIcon />} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplateQuestion;
