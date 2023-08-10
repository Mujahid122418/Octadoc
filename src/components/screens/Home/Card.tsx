import React from "react";
import "./Home.css";

import ViewStreamIcon from "@mui/icons-material/ViewStream";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";

interface ICard {
  item: any;
  DeleteTemplate: (value: any) => void;
  updateTemplate: (value: any) => void;
}
const Card: React.FC<ICard> = ({ item, DeleteTemplate, updateTemplate }) => {
  return (
    <div className="col-lg-4 col-md-6 mt-4">
      <div className="card-box">
        <div className="card-head">
          <div className="icon-box">
            <IconButton>
              <ViewStreamIcon />
            </IconButton>
            <div className="band">
              <p>12</p>
            </div>
          </div>
          <div className="text">
            <center>
              <h6>{item?.template_name}</h6>
              <p>
                By <b>{item?.template_type}</b>
              </p>
            </center>
          </div>
          <div className="icon-box">
            <IconButton>
              <QuestionMarkIcon />
            </IconButton>
            <div className="band">
              <p>2</p>
            </div>
          </div>
        </div>

        <center>
          <p className="btm-text">{item?.description}</p>
        </center>
        <Stack
          direction="row"
          spacing={1}
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <IconButton aria-label="delete" onClick={() => updateTemplate(item)}>
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => DeleteTemplate(item?._id)}
          >
            <DeleteIcon />
          </IconButton>
          {/* </div> */}
        </Stack>
      </div>
    </div>
  );
};
export default Card;
