import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { IconButton, Tooltip, Checkbox, Stack } from "@mui/material";

import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AppDispatch } from "../../../redux/Store";
import type { RootState } from "../../../redux/Store";
import {
  EditSelectedQuestionFun,
  ParentId_Fun,
  UpdateGetQuestionArray,
  editQuestionModelFun,
} from "../../../redux/TemplateQuestion/TemplateQuestion";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import {
  getQuestion,
  DeleteQuestion,
} from "../../../redux/TemplateQuestion/TemplateQuestionAPI";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { customRadioStyle } from "../QuestionBarModal/EditQuestionBar";
import { useState } from "react";

interface ModelProps {
  index: any;
  item: any;
  checkLink: any;
  states: any;
  setStates: any;
}

const ItemsRender: React.FC<ModelProps> = ({ index, item, checkLink }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { editQuestionModel, getQuestions } = useSelector(
    (state: RootState) => state?.templateQuestion
  );
  // console.log("editQuestionModel===>", editQuestionModel);
  // console.log("getQuestions===>", getQuestions);

  const [selected, setSelected] = useState<any[]>([]);
  const [selectedDose, setSelectedDose] = useState(false);

  const updateTemplateQuestion = async (e: any) => {
    dispatch(EditSelectedQuestionFun(e));
    dispatch(editQuestionModelFun(!editQuestionModel));
    dispatch(ParentId_Fun(e._id));
  };
  const DeleteTemplateQuestion = async (id: any) => {
    let data = {
      questionId: id,
    };

    dispatch(DeleteQuestion(data))
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

  const selectDateChange = (id: any, e: any) => {
    let newdata = getQuestions?.map((element: any) =>
      element?._id === id
        ? { ...element, selectedDate: e.target.value, selectedOption: "" }
        : element
    );
    dispatch(UpdateGetQuestionArray(newdata));
  };

  const onChangeHours = (id: any, e: any) => {
    let newdata = getQuestions?.map((element: any) =>
      element?._id === id ? { ...element, hours: e.target.value } : element
    );

    dispatch(UpdateGetQuestionArray(newdata));
  };
  const onChangeHoursDuration = (id: any, e: any) => {
    let newdata = getQuestions?.map((element: any) =>
      element?._id === id ? { ...element, selectedOption: e } : element
    );
    dispatch(UpdateGetQuestionArray(newdata));
  };
  const onChangeDosageInput = (id: any, e: any) => {
    let newdata = getQuestions?.map((element: any) =>
      element?._id === id ? { ...element, dosageInput: e } : element
    );

    dispatch(UpdateGetQuestionArray(newdata));
  };

  const onChangeDosageInputType = (id: any, e: any) => {
    let newdata = getQuestions?.map((element: any) =>
      element?._id === id ? { ...element, selectedRadioValue: e } : element
    );

    dispatch(UpdateGetQuestionArray(newdata));
  };
  const onChangeDosageInputType2 = (id: any, e: any) => {
    let newdata = getQuestions?.map((element: any) =>
      element?._id === id ? { ...element, selectedRadioValue2: e } : element
    );

    dispatch(UpdateGetQuestionArray(newdata));
  };

  const onChangeFreeText = (id: any, e: any) => {
    let newdata = getQuestions?.map((element: any) =>
      element?._id === id ? { ...element, freeText: e } : element
    );
    dispatch(UpdateGetQuestionArray(newdata));
  };
  const onChangeSingleText = (id: any, e: any) => {
    let newdata = getQuestions?.map((element: any) =>
      element?._id === id ? { ...element, singleText: e } : element
    );

    dispatch(UpdateGetQuestionArray(newdata));
  };
  const onChangeMultiText = async (
    id: any,
    e: any,
    arr: any,
    item: any,
    selectedIndex: any,
    selectedValue: boolean
  ) => {
    // console.log(" id", id);
    // console.log(" e", e);
    // console.log("arr", arr);
    // console.log("item", item);
    // console.log("selectedIndex", selectedIndex);

    // console.log("selectedValue", selectedValue);
    // getQuestions?.map((element: any) => element?._id === getQuestions[id]?._id ? console.log("arr ===>", arr)
    //   : element)

    if (selectedValue) {
      // console.log("id ===>", getQuestions[id]?._id);
      let data = getQuestions?.map((element: any) =>
        element?._id === getQuestions[id]?._id
          ? { ...element, followUpSelected: arr }
          : element
      );

      dispatch(UpdateGetQuestionArray(data));
    } else {
      let check = getQuestions[id]?.followUpSelected?.filter(
        (e1: any) => e1 !== item
      );
      let data = getQuestions?.map((element: any) =>
        element?._id === getQuestions[id]?._id
          ? { ...element, followUpSelected: check }
          : element
      );
      // console.log("data ==> ", data[id]);
      dispatch(UpdateGetQuestionArray(data));
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <div>
          <li style={{ display: "flex" }}>
            <ArrowForwardIosRoundedIcon className="icon-size" />
            <div style={{ display: "flex" }}>
              {item?.question}
              {item?.tip && (
                <div>
                  {checkLink ? (
                    <Tooltip
                      title={item?.tip}
                      style={{
                        marginLeft: 10,
                        padding: 2,
                        backgroundColor: "#949396",
                        borderRadius: 30,
                        color: "white",
                      }}
                    >
                      <a target="_blank" href={item.tip}>
                        {item?.tip.slice(0, 4)}
                      </a>
                    </Tooltip>
                  ) : (
                    <Tooltip title={item?.tip}>
                      <IconButton
                        style={{
                          backgroundColor: "#949396",
                          width: 20,
                          height: 20,
                          marginLeft: 5,
                        }}
                      >
                        <PriorityHighIcon
                          sx={{
                            width: 15,
                            color: "white",
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  )}
                </div>
              )}
            </div>
          </li>
        </div>

        <div>
          <Stack
            direction="row"
            spacing={1}
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              aria-label="edit"
              onClick={() => updateTemplateQuestion(item)}
            >
              <EditIcon className="icon-size" />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => DeleteTemplateQuestion(item?._id)}
            >
              <DeleteIcon className="icon-size" />
            </IconButton>
            <Tooltip title="Add Followup">
              <IconButton onClick={() => updateTemplateQuestion(item)}>
                <AddIcon className="icon-size" />
              </IconButton>
            </Tooltip>
          </Stack>
        </div>
      </div>

      {item?.questionType === "Date Time" ? (
        <div className="answer mt-3 mb-2 ms-3">
          <div className="first">
            <label>When did this start?</label>
            <input
              type="date"
              className="date-input"
              value={item?.selectedDate}
              onChange={(e: any) => selectDateChange(item?._id, e)}
            />
          </div>
          <h6 className="mx-3 mb-0">OR</h6>
          <div className="time">
            <label htmlFor="">How long age?</label>
            <div className="time-in">
              <input
                type="text"
                value={item?.hours}
                onChange={(e: any) => onChangeHours(item?._id, e)}
              />
              <select
                className="ms-2"
                aria-label="Default select example"
                value={item?.selectedOption}
                onChange={(e: any) =>
                  onChangeHoursDuration(item?._id, e.target.value)
                }
              >
                <option value="">Select</option>
                <option value="Hours">Hours</option>
                <option value="Days">Days</option>
                <option value="Weeks">Weeks</option>
                <option value="Months">Months</option>
                <option value="Years">Years</option>
              </select>
            </div>
          </div>
        </div>
      ) : item?.questionType === "Dosage" ? (
        <div
          className="answer mt-3 mb-2 ms-3"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className="first">
            <label>When did this start?</label>
            <input
              type="text"
              value={item?.dosageInput}
              onChange={(e: any) =>
                onChangeDosageInput(item?._id, e.target.value)
              }
            />
            <b className="mg"> mg</b>
          </div>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              name="position"
              value={item?.selectedRadioValue}
              onChange={(e: any) =>
                onChangeDosageInputType(item?._id, e.target.value)
              }
              sx={{
                border: "1px solid #6049cd",
                borderRadius: "20px",
                marginLeft: "20px",
              }}
            >
              <FormControlLabel
                value="OD"
                control={<Radio style={customRadioStyle} />}
                label="OD"
                labelPlacement="top"
              />
              <FormControlLabel
                value="BD"
                control={<Radio style={customRadioStyle} />}
                label="BD"
                labelPlacement="top"
              />
              <FormControlLabel
                value="TDS"
                control={<Radio style={customRadioStyle} />}
                label="TDS"
                labelPlacement="top"
              />
              <FormControlLabel
                value="QDS"
                control={<Radio style={customRadioStyle} />}
                label="QDS"
                labelPlacement="top"
              />
            </RadioGroup>
          </FormControl>

          <div
            onClick={(e) => {
              setSelectedDose(!selectedDose);
              onChangeDosageInputType2(item?._id, !selectedDose ? "PRN" : "");
            }}
            style={{
              border: "0.25px solid black",
              padding: 5,
              borderRadius: 10,
              backgroundColor: selectedDose ? " #6049cd" : "white",
              color: selectedDose ? "white" : "black",
            }}
          >
            PRN
          </div>
        </div>
      ) : item?.questionType === "Free Text" ? (
        <div className="answer mt-3 mb-2 ms-3">
          <div className="first">
            <input
              value={item?.freeText}
              onChange={(e) => onChangeFreeText(item?._id, e.target.value)}
              type="text"
              placeholder="Free Text"
            />
          </div>
        </div>
      ) : item?.questionType === "Multiple Choice" ? (
        <div>
          {item?.answer?.length > 0 && (
            <ul>
              {item?.answer?.map((item: any, indexx: any) => (
                <div style={{ marginTop: 10 }}>
                  <span
                    onClick={(e) => {
                      onChangeMultiText(
                        index,
                        selected,
                        [...selected, item],
                        item,
                        indexx,
                        !selected.includes(item) ? true : false
                      );
                      selected.includes(item)
                        ? setSelected(selected.filter((i: any) => i !== item))
                        : setSelected([...selected, item]);
                    }}
                    style={{
                      border: "0.25px solid black",
                      padding: 5,
                      borderRadius: 10,
                      backgroundColor: selected.includes(item)
                        ? " #6049cd"
                        : "white",
                      color: selected.includes(item) ? "white" : "black",
                    }}
                  >
                    {item ? item?.split("-")[0] : null}
                  </span>
                </div>
              ))}
            </ul>
          )}
          <li className="mt-4">
            1:- {item?.followUp.length > 0 ? item?.followUp[0].question : null}
          </li>
          {item?.followUp.map((e1: any, i: any) => {
            return (
              <>
                {console.log("saaaaaa", item.followUp[0])}
                <div
                  style={{
                    padding: 5,
                    paddingTop: 3,
                    display: "inline-block",
                  }}
                >
                  {e1?.answer.map((item: any, indexx: any) => (
                    <div
                      style={{
                        marginTop: 10,
                      }}
                    >
                      <span
                        onClick={(e) => {
                          onChangeMultiText(
                            index,
                            selected,
                            [...selected, item],
                            item,
                            indexx,
                            !selected.includes(item) ? true : false
                          );

                          selected.includes(item)
                            ? setSelected(
                                selected.filter((i: any) => i !== item)
                              )
                            : setSelected([...selected, item]);
                        }}
                        style={{
                          border: "0.25px solid black",
                          padding: 5,
                          borderRadius: 10,
                          backgroundColor: selected.includes(item)
                            ? " #6049cd"
                            : "white",
                          color: selected.includes(item) ? "white" : "black",
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            );
          })}
        </div>
      ) : item?.questionType === "Single Choice" ? (
        <div>
          {item?.answer && (
            <input
              disabled
              value={item?.answer}
              type="text"
              placeholder="Free Text"
            />
          )}

          {item?.followUp.map((e1: any) => {
            return (
              <div className=" mt-3 mb-2 ms-3">
                <li> {e1?.question} </li>
                <span
                  className="first"
                  onChange={(e) => onChangeSingleText(item?._id, e1?.answer)}
                >
                  <input
                    disabled
                    value={e1?.answer}
                    type="text"
                    placeholder="Free Text"
                  />
                </span>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default ItemsRender;
