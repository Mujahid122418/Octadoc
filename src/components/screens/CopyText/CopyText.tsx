import React from "react";
import "./CopyText.css";
import Button2 from "../Button2/Button2";
interface CopyTextProps {
  sectionName: string;
  states: any;
}

const CopyText: React.FC<CopyTextProps> = ({ states, sectionName }) => {
  const {
    hours,
    textInput,
    selectedDate,
    selectedOption,
    checkboxValues,
    singeldRadioValue,
    selectedRadioValue,
  } = states;
  
  
  const handleClickBtn = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const noteItems = [
      hours,
      textInput,
      sectionName,
      selectedDate,
      selectedOption,
      checkboxValues,
      singeldRadioValue,
      selectedRadioValue,
    ];
    const filteredList = noteItems?.filter(
      (item) => item !== undefined && item !== false && item !== ""
    );
    const copiedText = filteredList?.map((item) => `- ${item}`).join("\n");
    try {
      await navigator.clipboard.writeText(copiedText);
      console.log("Notes copied to clipboard!");
    } catch (error) {
      console.error("Unable to copy notes to clipboard: ", error);
    }
  };

  return (
    <div  
    // className="tabs-scroll"
    style={{position:'fixed' , width:"22%"}}
    >
      <div className="copy-box">
        <h3 className="fw-bold">Patient Notes</h3>
        <div className="copy-text">
          <div className="head-text">
            <u>{sectionName}</u>
          </div>
          <ul className="uper-list">
            {Object.keys(states).map((i) => {
              if (!states[i]) {
                return null;
              }
              const formattedItem =
                i === "selectedDate"
                  ? `Since ${states[i]}`
                  : i === "hours"
                  ? `Last ${states[i]} ${selectedOption.toLowerCase()}`
                  : i === "checkboxValues"
                  ? states[i]
                    ? "yes"
                    : "no"
                  : i === "singeldRadioValue"
                  ? states[i]
                    ? "PRN yes"
                    : "PRN no"
                  : states[i];
              return (
                <li className="uper-li" key={i}>
                  {formattedItem}
                </li>
              );
            })}
          </ul>
          <Button2 name="Copy Notes" onClick={handleClickBtn} />
          <div className="download-btn mt-2">
            <Button2 name="Download Formatted" onClick={handleClickBtn} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyText;
