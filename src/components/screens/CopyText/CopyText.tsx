import React, { useEffect, useState } from "react";
import "./CopyText.css";
import Button2 from "../Button2/Button2";
import type { RootState } from "../../../redux/Store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

interface CopyTextProps {
  sectionName: string;
  states: any;
}

const CopyText: React.FC<CopyTextProps> = ({ states, sectionName }) => {
  const { getQuestions } = useSelector(
    (state: RootState) => state?.templateQuestion
  );
  const [copyTextRtf, setcopyTextRtf] = useState("");

  useEffect(() => {
    const textToCopy = document.getElementById("yourHtmlId");
    if (textToCopy) {
      const copiedText = Array.from(textToCopy.children)
        .map((child) => child.textContent)
        .join("\n");
      setcopyTextRtf(copiedText.replace(/_/g, "\\par\n"));
    }
  }, [getQuestions]);

  const copyText = () => {
    const textToCopy = document.getElementById("yourHtmlId"); // replace 'yourHtmlId' with the actual ID of your HTML element

    if (textToCopy) {
      // Create a copy of the text content with line breaks
      const copiedText = Array.from(textToCopy.children)
        .map((child) => child.textContent)
        .join("\n");

      // Create a temporary element to hold the modified text
      const tempElement = document.createElement("textarea");
      tempElement.value = copiedText.replace(/_/g, "");

      document.body.appendChild(tempElement);

      // Select and copy the modified text
      tempElement.select();
      document.execCommand("copy");
      document.body.removeChild(tempElement);
      toast.success("Notes copied to clipboard!");
    }
  };

  const generateRtfContent = () => {
    const initialText =
      "{\\rtf1\\ansi\\ansicpg1252\\deff0\\nouicompat\\deflang1033{\\fonttbl{\\f0\\fnil\\fcharset0 Calibri;}}\n";
    const appendedText = `${copyTextRtf}\\par\n`;
    const closingTag = "}";

    const rtfContent = initialText + appendedText + closingTag;
    return rtfContent;
  };

  const downloadRtf = () => {
    const rtfContent = generateRtfContent();
    const blob = new Blob([rtfContent], { type: "application/rtf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${sectionName}.rtf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  console.log("getQuestions", getQuestions);

  return (
    <div style={{ position: "fixed", width: "22%" }}>
      <div className="copy-box">
        <h3 className="fw-bold">Patient Notes</h3>
        <div className="copy-text">
          <div className="head-text">
            <u>{sectionName}</u>
          </div>

          <ul id="yourHtmlId" className="uper-list">
            {getQuestions &&
              getQuestions?.map((item: any, i: number) => {
                // console.log("item?.followUpSelected", item?.questionType === "Free Text" );

                // type date and time
                let dataTime = item?.selectedDate
                  ? `Since ${item.selectedDate}`
                  : null;
                let hours = item?.hours
                  ? `last ${item?.hours + " " + item?.selectedOption}`
                  : null;
                let dataTimeShow = item?.selectedOption
                  ? hours
                  : item?.selectedDate
                  ? dataTime
                  : null;
                // type date and time
                let InputDosage = `${item?.dosageInput}mg ${
                  item?.selectedRadioValue
                }  ${
                  item?.selectedRadioValue2 ? item?.selectedRadioValue2 : ""
                }`;
                let freeText = item?.freeText
                  ? item?.freeText
                  : item?.followUpSelected?.toString();

                // const formattedItem = item?.selectedOption ? hours : item?.selectedDate ? dataTime : item?.dosageInput && item?.selectedRadioValue ? `${item?.dosageInput}mg ${item?.selectedRadioValue}  ${item?.selectedRadioValue2 ? item?.selectedRadioValue2 : ""}` : freeText

                let formattedItem;

                if (dataTimeShow) {
                  formattedItem = dataTimeShow;
                } else if (item?.dosageInput && item?.selectedRadioValue) {
                  formattedItem = InputDosage;
                } else if (freeText && item?.questionType === "Free Text") {
                  // formattedItem = item?.answerOutput ? item?.answerOutput : freeText?.split('-')[1]
                  formattedItem = " item?.freeText";
                } else if (item?.followUpSelected) {
                  console.log(
                    "item?.followUpSelected",
                    item?.followUpSelected[0]?.includes("-")
                  );

                  formattedItem = item?.followUpSelected[0]?.includes("-")
                    ? item?.followUpSelected[0]?.split("-")[1]
                    : item?.followUpSelected?.toString();
                }

                // else if (item?.answer && item?.questionType === "Multiple Choice") {
                //   console.log("item?.answer 5", item?._id, item?.answer);

                // }

                return (
                  <div className="uper-li" key={i}>
                    {formattedItem ? formattedItem : null}{" "}
                    <span style={{ display: "none" }}>_</span>
                  </div>
                );
              })}
          </ul>
          <Button2 name="Copy Notes" onClick={copyText} />
          <div className="download-btn mt-2">
            <Button2 name="Download Formatted" onClick={downloadRtf} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyText;
