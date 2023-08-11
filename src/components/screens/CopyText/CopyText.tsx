import React from 'react'
import './CopyText.css'
import Button2 from '../Button2/Button2'

const CopyText = () => {

    const handleClickBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
      };

  return (
    <div>
       <div className="copy-box">
        <h3 className='text-white fw-bold'>Patient Notes</h3>
            <div className="copy-text">
                <div className="head-text"><u>Sec-Name</u></div>
                <ul className='uper-list'>
                    <li className='uper-li'>sadas</li>
                    <li className='uper-li'>dssdfsdfsf</li>
                    <li className='uper-li'>Yes
                        <ul>
                            <li>Yes</li>
                        </ul>
                    </li >
                    <li className='uper-li'>sadsas</li>
                </ul>
                <Button2 name='Copy Notes' onClick={handleClickBtn} />
                <div className="download-btn mt-2">
                <Button2 name='Download Formatted' onClick={handleClickBtn} />
                </div>
            </div>
       </div>
    </div>
  )
}

export default CopyText
