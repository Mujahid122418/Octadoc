import { useEffect, useState } from "react";
import "./TemplateQuestion.css";

import Button2 from "../Button2/Button2";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import HighlightAltIcon from "@mui/icons-material/HighlightAlt";

import type { RootState } from "../../../redux/Store";

import QuestionBar from "../QuestionBarModal/QuestionBar";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/Store";
import { addQuestionModelFun } from "../../../redux/TemplateQuestion/TemplateQuestion";

import {
  getQuestion,
  getAnswers,
} from "../../../redux/TemplateQuestion/TemplateQuestionAPI";

import EditQuestionBar from "../QuestionBarModal/EditQuestionBar";

import { Box } from "@mui/material";

import { getSection } from "../../../redux/Section/SectionAPI";

import { toast } from "react-toastify";

import { getTemplates } from "../../../redux/Template/TemplateAPI";
import SectionTabs from "./Tab";
import ItemsRender from "./Items";
import { isPurchasedModelFun } from "../../../redux/Auth/AuthSlice";
import CopyText from "../CopyText/CopyText";

const ShowTemplateQuestion = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state?.auth);
  const [section, setSection] = useState([1]);
  const [openSection, setOpenSection] = useState(false);

  const [formData, setFormData] = useState({
    hours: "",
    dosageInput: "",
    selectedDate: "",
    selectedOption: "",
    selectedRadioValue: "",
    checkboxValues: false,
    singeldRadioValue: false,
  });
  const { addQuestionModel, getQuestions, editQuestionModel } = useSelector(
    (state: RootState) => state?.templateQuestion
  );
  const { template } = useSelector((state: RootState) => state?.template);
  // model state start

  // template name
  const [TemplateName, setTemplateName] = useState("");

  // model state end
  // handel section start
  const { activeSection } = useSelector((state: RootState) => state?.section);

  // handel section end
  let tem_id = window.location.href.split("/questions/")[1];
  useEffect(() => {
    let data = {
      page: 1,
      pageSize: 20,
      tempplate_id: tem_id,
    };
    dispatch(getQuestion(data));
    dispatch(getAnswers(data));
    dispatch(getSection(data));
  }, []);

  // console.log("tem_id", tem_id);

  const AddQuestionModel = async () => {
    if (!activeSection) {
      toast.error("Please Select Active Section.");
    } else {
      try {
        localStorage.removeItem("last_question_id");
        dispatch(addQuestionModelFun(!addQuestionModel));
      } catch (error) {}
    }
  };

  // ====tabs======

  const [sectionName, setSectionName] = useState("");

  // ====tabs end======

  useEffect(() => {
    dispatch(getTemplates());
  }, [dispatch]);
  const init = async () => {
    let data = await template.filter((item) => item?._id == tem_id);

    let name = data[0]?.template_name;

    setTemplateName(name ? name : "");
  };
  useEffect(() => {
    init();
  }, [tem_id, template]);

  const SectionDetails = section?.map((item, index) => {
    return (
      <div
        key={index}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* ======= tabs ====== */}

        <div
          style={{
            width: "100%",
          }}
          // className="container"
        >
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "background.paper",
              display: "flex",
              width: "100%",
            }}
          >
            <div className="bg">
             
              <SectionTabs
                openSection={openSection}
                setOpenSection={setOpenSection}
                setSectionName={setSectionName}
              />
            </div>

            <div style={{ width: "70%", marginRight: 20, marginLeft: 20, zIndex:1000 }}>
              <div key={index}>
                <div className="questions-box">
                  <div className="d-flex justify-content-between ">
                    <h3 className="text-white">
                      {TemplateName ? TemplateName : "Template Name"}
                    </h3>
                  </div>
                  <div className="question-head">
                    {/* <HelpOutlineIcon className="icon-size" />{" "} */}
                    <h5 className="mb-0 ms-1">
                      {sectionName ? sectionName : "Select Section"}{" "}
                    </h5>
                  </div>

                  <div className="question-body">
                    <ul className="mt-4 mb-4">
                      {getQuestions?.filter(
                        (item: any) =>
                          item?.template_id === tem_id &&
                          item.section_id === activeSection
                      )?.length > 0 ? (
                        getQuestions
                          ?.filter(
                            (item: any) =>
                              item?.template_id === tem_id &&
                              item.section_id === activeSection
                          )
                          .map((item: any, i: Number) => {
                            let urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
                            let checkLink = urlRegex.test(item?.tip);

                            return (
                              <div key={item._id}>
                                <ItemsRender
                                  item={item}
                                  checkLink={checkLink}
                                  states={formData}
                                  setStates={setFormData}
                                />
                              </div>
                            );
                          })
                      ) : (
                        <p style={{ textAlign: "center" }}>No Record Found</p>
                      )}
                    </ul>
                  </div>
                  <div className="question-footer">
                    <Button2
                      name="Add Question"
                      onClick={
                         () => 
                        // AddQuestionModel()
                        user?.isPurchased
                          ? AddQuestionModel()
                          : dispatch(isPurchasedModelFun(true))
                      }
                      icon={<HelpCenterIcon />}
                    />
                    <Button2
                      name="Add Section"
                      onClick={() => {
                        user?.isPurchased
                          ? setOpenSection(true)
                          : dispatch(isPurchasedModelFun(true));
                      }}
                      icon={<HighlightAltIcon />}
                    />
                    <QuestionBar />
                    <EditQuestionBar />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "30%" }}>
              {/* <CopyText sectionName={sectionName} states={formData} /> */}
            </div>
          </Box>
        </div>

        {/* =====tabs end ====== */}
      </div>
    );
  });

  return (
    <div>
      <div>{SectionDetails}</div>
    </div>
  );
};

export default ShowTemplateQuestion;
