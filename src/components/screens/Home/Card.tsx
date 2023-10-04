import React, { useEffect, useState } from "react";
import "./Home.css";

import ViewStreamIcon from "@mui/icons-material/ViewStream";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/Store";
import { Link } from "react-router-dom";
import axios from "axios";
import { Baseurl } from "../../../utils/BaseUrl";

interface ICard {
  item: any;
  DeleteTemplate: (value: any) => void;
  updateTemplate: (value: any) => void;
}

const Card: React.FC<ICard> = ({ item, DeleteTemplate, updateTemplate }) => {
  const { user } = useSelector((state: RootState) => state?.auth);
  const [template, setTemplate] = useState("");
  const [question, setQuestion] = useState("");
  const initTemplate = async () => {
    let { data } = await axios.get(
      Baseurl + `/section/countSection/${item?._id}`
    );
    let { count } = data;

    setQuestion(count);
  };
  const initQuestion = async () => {
    let { data } = await axios.get(Baseurl + `/countQuestion/${item?._id}`);

    let { count } = data;

    setTemplate(count);
  };
  useEffect(() => {
    initTemplate();
    initQuestion();
  }, [item]);
  return (
    <div className="col-lg-4 col-md-6 mt-4">
      <div className="card-box">
        <Link to={`/questions/${item?._id}`}>
          <div className="card-head">
            <div className="text">
              <h6 className="mb-0">{item?.template_name}</h6>
              <p className="mt-2">
                By <b>{item?.template_type}Ahmad</b>{" "}
                <span className="cat-name">category name</span>
              </p>
            </div>
            <div className="d-flex">
              <div className="icon-box me-1">
                <IconButton>
                  <ViewStreamIcon />
                </IconButton>
                <div className="band">
                  <p>{question}</p>
                </div>
              </div>
              <div className="icon-box">
                <IconButton>
                  <QuestionMarkIcon />
                </IconButton>
                <div className="band">
                  <p>{template}</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <p className="btm-text">
          {item?.description} Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
          amet, consectetur adipisicing.
        </p>
        <Stack
          direction="row"
          spacing={1}
          className="action"
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <IconButton
            className="action-btn"
            disabled={item?.user_id === user?._id ? false : true}
            sx={{ opacity: item?.user_id === user?._id ? 1 : 0.8 }}
            aria-label="delete"
            onClick={() => updateTemplate(item)}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            disabled={
              item?.user_id === user?._id &&
              window.location.pathname === "/template"
                ? false
                : true
            }
            sx={{
              opacity:
                item?.user_id === user?._id &&
                window.location.pathname === "/template"
                  ? 1
                  : 0.8,
            }}
            aria-label="delete"
            className="action-btn"
            onClick={() => DeleteTemplate(item?._id)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      </div>
    </div>
  );
};
export default Card;
